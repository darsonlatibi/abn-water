"use strict";

const fs = require("fs");
const path = require("path");

/*
============================================================
PROJECT
============================================================
*/

const ROOT = path.resolve(__dirname, "..");
const CLIENT_DIR = path.join(ROOT, "client");

/*
============================================================
SHARP
============================================================

sharp diinstall di:

  F:\siweb\abn-water\client\node_modules\sharp

Script:

  F:\siweb\abn-water\scripts\svg-to-jpg.cjs

============================================================
*/

let sharp;

try {
  sharp = require(
    require.resolve("sharp", {
      paths: [CLIENT_DIR],
    }),
  );
} catch (error) {
  console.error("");
  console.error("==============================================");
  console.error(" ERROR: SHARP NOT FOUND");
  console.error("==============================================");
  console.error("");
  console.error("sharp tidak ditemukan di client/node_modules.");
  console.error("");
  console.error(`Expected: ${path.join(CLIENT_DIR, "node_modules", "sharp")}`);
  console.error("");
  console.error("Install sharp dengan:");
  console.error("");
  console.error("  cd client");
  console.error("  npm install sharp");
  console.error("");
  process.exit(1);
}

/*
============================================================
ABN SVG → JPG
============================================================

SOURCE:

  client/src/assets/

OUTPUT:

  JPG berada satu folder dengan SVG.

Contoh:

  client/src/assets/
  ├── pump.svg
  ├── pump.jpg
  ├── tank.svg
  ├── tank.jpg
  └── agriculture/
      ├── irrigation.svg
      └── irrigation.jpg

============================================================

Usage:

  node scripts/svg-to-jpg.cjs

  node scripts/svg-to-jpg.cjs --all

  node scripts/svg-to-jpg.cjs --input client/src/assets/pump.svg

  node scripts/svg-to-jpg.cjs --input client/src/assets

  node scripts/svg-to-jpg.cjs --force

  node scripts/svg-to-jpg.cjs --all --force

  node scripts/svg-to-jpg.cjs --help

============================================================
*/

/*
============================================================
INPUT
============================================================
*/

const ASSETS_DIR = path.join(CLIENT_DIR, "src", "assets");

/*
============================================================
IMAGE SETTINGS
============================================================
*/

const WIDTH = 1600;
const HEIGHT = 900;
const QUALITY = 92;
const DENSITY = 144;

/*
============================================================
FLAGS
============================================================
*/

const ARGS = process.argv.slice(2);

const FORCE = ARGS.includes("--force");
const ALL = ARGS.includes("--all");

const HELP = ARGS.includes("--help") || ARGS.includes("-h");

/*
============================================================
HELP
============================================================
*/

function showHelp() {
  console.log("");
  console.log("==============================================");
  console.log(" ABN SVG → JPG");
  console.log("==============================================");
  console.log("");

  console.log("Source:");
  console.log("");

  console.log(`  ${path.relative(ROOT, ASSETS_DIR)}`);

  console.log("");

  console.log("JPG:");
  console.log("");

  console.log("  Disimpan satu folder dengan SVG.");

  console.log("");

  console.log("Usage:");
  console.log("");

  console.log("  node scripts/svg-to-jpg.cjs");

  console.log("");

  console.log("  node scripts/svg-to-jpg.cjs --all");

  console.log("");

  console.log(
    "  node scripts/svg-to-jpg.cjs --input client/src/assets/pump.svg",
  );

  console.log("");

  console.log("  node scripts/svg-to-jpg.cjs --input client/src/assets");

  console.log("");

  console.log("  node scripts/svg-to-jpg.cjs --force");

  console.log("");

  console.log("  node scripts/svg-to-jpg.cjs --all --force");

  console.log("");

  console.log("Options:");
  console.log("");

  console.log("  --input <path>   Convert file/folder tertentu");

  console.log("  --all            Convert semua SVG di assets");

  console.log("  --force          Convert ulang JPG yang sudah ada");

  console.log("  --help, -h       Tampilkan bantuan");

  console.log("");

  console.log("Image:");
  console.log("");

  console.log(`  Size     : ${WIDTH}x${HEIGHT}`);
  console.log(`  Quality  : ${QUALITY}`);
  console.log(`  Density  : ${DENSITY}`);

  console.log("");

  console.log("==============================================");
  console.log("");
}

/*
============================================================
HELPERS
============================================================
*/

function ensureDir(dir) {
  fs.mkdirSync(dir, {
    recursive: true,
  });
}

function isSvg(filePath) {
  return path.extname(filePath).toLowerCase() === ".svg";
}

function normalizePath(filePath) {
  return path.normalize(
    path.isAbsolute(filePath) ? filePath : path.resolve(ROOT, filePath),
  );
}

/*
============================================================
RECURSIVE SVG COLLECTOR
============================================================

Mencari SVG hanya di:

  client/src/assets/

Subfolder tetap didukung.

Contoh:

  assets/pump.svg
  assets/agriculture/irrigation.svg

============================================================
*/

function collectSvgFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const stat = fs.statSync(dir);

  /*
  ----------------------------------------------------------
  SINGLE FILE
  ----------------------------------------------------------
  */

  if (stat.isFile()) {
    return isSvg(dir) ? [dir] : [];
  }

  /*
  ----------------------------------------------------------
  DIRECTORY
  ----------------------------------------------------------
  */

  const result = [];

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    /*
    --------------------------------------------------------
    SKIP
    --------------------------------------------------------
    */

    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    /*
    --------------------------------------------------------
    DIRECTORY
    --------------------------------------------------------
    */

    if (entry.isDirectory()) {
      result.push(...collectSvgFiles(fullPath));

      continue;
    }

    /*
    --------------------------------------------------------
    SVG
    --------------------------------------------------------
    */

    if (entry.isFile() && isSvg(fullPath)) {
      result.push(fullPath);
    }
  }

  return result;
}

/*
============================================================
OUTPUT PATH
============================================================

PENTING:

Output JPG berada satu folder dengan SVG.

Contoh:

  client/src/assets/pump.svg

  →

  client/src/assets/pump.jpg


Subfolder:

  client/src/assets/agriculture/irrigation.svg

  →

  client/src/assets/agriculture/irrigation.jpg

============================================================
*/

function getOutputPath(svgPath) {
  const parsed = path.parse(svgPath);

  return path.join(parsed.dir, `${parsed.name}.jpg`);
}

/*
============================================================
CONVERT SINGLE SVG
============================================================
*/

async function convertSvg(svgPath) {
  const outputPath = getOutputPath(svgPath);

  const relativeInput = path.relative(ROOT, svgPath);

  const relativeOutput = path.relative(ROOT, outputPath);

  /*
  ----------------------------------------------------------
  SKIP EXISTING JPG
  ----------------------------------------------------------
  */

  if (fs.existsSync(outputPath) && !FORCE) {
    console.log(`SKIP   ${relativeInput}`);

    console.log(`       ${relativeOutput}`);

    return {
      status: "skipped",
      input: svgPath,
      output: outputPath,
    };
  }

  /*
  ----------------------------------------------------------
  BUILD
  ----------------------------------------------------------
  */

  console.log(`${FORCE ? "FORCE " : "BUILD "} ${relativeInput}`);

  try {
    await sharp(svgPath, {
      density: DENSITY,
    })
      .resize(WIDTH, HEIGHT, {
        fit: "contain",

        background: {
          r: 255,
          g: 255,
          b: 255,
          alpha: 1,
        },
      })
      .jpeg({
        quality: QUALITY,
        mozjpeg: true,
      })
      .toFile(outputPath);

    console.log(`       → ${relativeOutput}`);

    return {
      status: "created",
      input: svgPath,
      output: outputPath,
    };
  } catch (error) {
    throw new Error(`Gagal convert SVG → JPG: ${error.message}`);
  }
}

/*
============================================================
GET INPUT FILES
============================================================
*/

function getInputFiles() {
  /*
  ----------------------------------------------------------
  --input
  ----------------------------------------------------------
  */

  const inputIndex = ARGS.indexOf("--input");

  if (inputIndex !== -1) {
    const input = ARGS[inputIndex + 1];

    if (!input) {
      throw new Error("--input membutuhkan path file/folder.");
    }

    const inputPath = normalizePath(input);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Path tidak ditemukan:\n${inputPath}`);
    }

    const stat = fs.statSync(inputPath);

    /*
    --------------------------------------------------------
    FILE
    --------------------------------------------------------
    */

    if (stat.isFile()) {
      if (!isSvg(inputPath)) {
        throw new Error(`File bukan SVG:\n${inputPath}`);
      }

      return [inputPath];
    }

    /*
    --------------------------------------------------------
    FOLDER
    --------------------------------------------------------
    */

    if (stat.isDirectory()) {
      return collectSvgFiles(inputPath);
    }

    return [];
  }

  /*
  ----------------------------------------------------------
  DEFAULT / --all
  ----------------------------------------------------------

  Semua SVG di:

    client/src/assets/

  ----------------------------------------------------------
  */

  return collectSvgFiles(ASSETS_DIR);
}

/*
============================================================
MAIN
============================================================
*/

async function main() {
  /*
  ----------------------------------------------------------
  HELP
  ----------------------------------------------------------
  */

  if (HELP) {
    showHelp();
    return;
  }

  /*
  ----------------------------------------------------------
  HEADER
  ----------------------------------------------------------
  */

  console.log("");
  console.log("==============================================");
  console.log(" ABN SVG → JPG");
  console.log("==============================================");

  console.log(`ROOT     : ${ROOT}`);

  console.log(`ASSETS   : ${ASSETS_DIR}`);

  console.log(`SHARP    : ${CLIENT_DIR}\\node_modules\\sharp`);

  console.log(`SIZE     : ${WIDTH}x${HEIGHT}`);

  console.log(`QUALITY  : ${QUALITY}`);

  console.log(`DENSITY  : ${DENSITY}`);

  console.log(`FORCE    : ${FORCE}`);

  console.log(`ALL      : ${ALL}`);

  console.log("OUTPUT   : Same folder as SVG");

  console.log("==============================================");

  console.log("");

  /*
  ----------------------------------------------------------
  CHECK ASSETS
  ----------------------------------------------------------
  */

  if (!fs.existsSync(ASSETS_DIR)) {
    throw new Error(`Folder assets tidak ditemukan:\n${ASSETS_DIR}`);
  }

  /*
  ----------------------------------------------------------
  COLLECT SVG
  ----------------------------------------------------------
  */

  const svgFiles = getInputFiles();

  /*
  ----------------------------------------------------------
  NO SVG
  ----------------------------------------------------------
  */

  if (svgFiles.length === 0) {
    console.log("Tidak ada file SVG ditemukan.");

    console.log("");

    return;
  }

  /*
  ----------------------------------------------------------
  SORT
  ----------------------------------------------------------
  */

  svgFiles.sort((a, b) =>
    a.localeCompare(b, undefined, {
      sensitivity: "base",
    }),
  );

  console.log(`Found ${svgFiles.length} SVG file(s).`);

  console.log("");

  /*
  ----------------------------------------------------------
  PROCESS
  ----------------------------------------------------------
  */

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const svgPath of svgFiles) {
    try {
      const result = await convertSvg(svgPath);

      if (result.status === "created") {
        created++;
      }

      if (result.status === "skipped") {
        skipped++;
      }
    } catch (error) {
      failed++;

      console.error(`ERROR  ${path.relative(ROOT, svgPath)}`);

      console.error(`       ${error.message}`);

      console.log("");
    }
  }

  /*
  ----------------------------------------------------------
  SUMMARY
  ----------------------------------------------------------
  */

  console.log("");

  console.log("==============================================");

  console.log(" SUMMARY");

  console.log("==============================================");

  console.log(`Created : ${created}`);

  console.log(`Skipped : ${skipped}`);

  console.log(`Failed  : ${failed}`);

  console.log("==============================================");

  console.log("");

  /*
  ----------------------------------------------------------
  EXIT CODE
  ----------------------------------------------------------
  */

  if (failed > 0) {
    process.exitCode = 1;
  }
}

/*
============================================================
RUN
============================================================
*/

main().catch((error) => {
  console.error("");

  console.error("==============================================");

  console.error(" FATAL ERROR");

  console.error("==============================================");

  console.error("");

  console.error(error.message);

  console.error("");

  process.exitCode = 1;
});
