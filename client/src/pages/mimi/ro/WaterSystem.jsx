import React, { useEffect, useState } from "react";
import ManualValve from "../MimicRO/utilsSvg/valves/ManualValve";
import MembraneVertical from "../MimicRO/MembraneVertical";
import PipeTee from "../MimicRO/utilsSvg/pipes/PipeTee";
import PipeStraight from "../MimicRO/utilsSvg/pipes/PipeStraight";
import UndergroundTank from "../MimicRO/utilsSvg/tanks/UndergroundTank";
import TankVertical from "../MimicRO/utilsSvg/tanks/TankVertical";
import ChemicalTank from "../MimicRO/utilsSvg/tanks/ChemicalTank";
import MembraneHorizontal from "../MimicRO/MembraneHorisontal";

const WaterSystem = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // SCADA scale logic
  const scale = isMobile ? 1.6 : 1;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0b1b2b", // SCADA dark background
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* GLOBAL SCALE GROUP */}
        <g transform={`scale(${scale})`}>
          {/* BACKGROUND GRID (optional SCADA feel) */}
          <rect width="1920" height="1080" fill="#0b1b2b" />

          {/* HEADER PANEL */}
          <rect x="0" y="0" width="1920" height="80" fill="#102a43" />
          <text x="40" y="50" fill="#00ffcc" fontSize="28">
            WATER SYSTEM SCADA
          </text>

          <ManualValve
            x={52}
            y={200}
            width={60}
            height={60}
            direction={"right"}
            label={"From PDAM"}
            tag="XV-103"
          />

          <MembraneVertical
            x={130}
            y={50}
            width={20}
            height={90}
            color="#e6d5a8"
            label=""
          />
          <MembraneVertical
            x={160}
            y={50}
            width={20}
            height={90}
            color="#2f2f2f"
            label=""
          />
          <MembraneVertical
            x={190}
            y={50}
            width={20}
            height={90}
            color="#7b2cbf"
            label=""
          />
          <PipeTee x={200} y={100} direction="top" />
          <PipeTee x={100} y={100} direction="bottom" />
          <PipeTee x={300} y={100} direction="left" />
          <PipeStraight x={370} y={100} direction="left" />
          <TankVertical
            x={600}
            y={200}
            width={100}
            height={200}
            tag="TK-103"
            label="CHEMICAL TANK"
            level={50}
            alarm={false}
            liquidColor="#f59e0b"
          />
          <ChemicalTank
            x={650}
            y={200}
            width={100}
            height={200}
            tag="TK-103"
            label="CHEMICAL TANK"
            level={50}
            alarm={false}
            liquidColor="#f59e0b"
          />
          <MembraneHorizontal
            x={650}
            y={200}
            width={100}
            height={200}
            tag="TK-103"
            label="CHEMICAL TANK"
            level={50}
            alarm={false}
            liquidColor="#f59e0b"
          />
          <ChemicalTank
            x={800}
            y={200}
            width={100}
            height={200}
            tag="TK-103"
            label="CHEMICAL TANK"
            level={50}
            alarm={false}
            liquidColor="#f59e0b"
          />
        </g>
      </svg>
    </div>
  );
};

export default WaterSystem;
