import React from "react";

import Tank from "../../../../components/MimicRO/Tank";
import Pump from "../../../../components/MimicRO/Pump";
import Valve from "../../../../components/MimicRO/Valve";
import Line from "../../../../components/MimicRO/Line";
import ElbowPipe from "../../../../components/MimicRO/ElbowPipe";
import LevelMeter from "../../../../components/MimicRO/level/LevelMeter";
import Transmitter from "../../../../components/MimicRO/Transmitter";
import MembraneVertical from "../../../../components/MimicRO/MembraneVertical";
import TeePipe from "../../../../components/MimicRO/TeePipe";

const RungkutRawProcess: React.FC = () => {
  return (
    <g id="rungkut-raw-process">
      {/* =====================================================
          PDAM INLET
      ====================================================== */}

      <text
        x="70"
        y="300"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="16"
        fontWeight="bold"
      >
        AIR PDAM
      </text>

      {/* =====================================================
          INLET LINE
      ====================================================== */}

      <Line x={110} y={160} length={40} direction="right" active={true} />

      {/* =====================================================
          INLET VALVE
      ====================================================== */}

      <Valve
        x={170}
        y={160}
        width={70}
        height={70}
        tag="XV-101"
        label="INLET"
        open={true}
        direction="right"
      />

      {/* =====================================================
          PIPE TO SILICA
      ====================================================== */}

      <Line x={200} y={160} length={50} direction="right" active={true} />

      {/* =====================================================
          SILICA FILTER
      ====================================================== */}

      <MembraneVertical
        x={250}
        y={150}
        width={40}
        height={150}
        label="SF-101"
      />

      <ElbowPipe
        x={300}
        y={160}
        width={40}
        height={40}
        direction="right-down"
        active={true}
      />

      <ElbowPipe
        x={350}
        y={400}
        width={40}
        height={40}
        direction="right-up"
        active={true}
      />

      <TeePipe x={350} y={250} size={100} direction="right" active={true} />

      <ElbowPipe
        x={350}
        y={160}
        width={40}
        height={40}
        direction="left-up"
        active={true}
      />

      <text
        x="410"
        y="450"
        textAnchor="middle"
        fill="#00bfff"
        fontSize="14"
        fontWeight="bold"
      >
        SILICA
      </text>

      {/* =====================================================
          PIPE TO MANGANESE
      ====================================================== */}

      <Line x={450} y={320} length={50} direction="right" active={true} />

      {/* =====================================================
          MANGANESE FILTER
      ====================================================== */}

      <MembraneVertical
        x={550}
        y={220}
        width={40}
        height={150}
        label="MF-101"
      />

      <text
        x="590"
        y="450"
        textAnchor="middle"
        fill="#00bfff"
        fontSize="14"
        fontWeight="bold"
      >
        MANGANESE
      </text>

      {/* =====================================================
          PIPE TO CARBON
      ====================================================== */}

      <Line x={630} y={320} length={50} direction="right" active={true} />

      {/* =====================================================
          CARBON FILTER
      ====================================================== */}

      <MembraneVertical
        x={730}
        y={220}
        width={40}
        height={150}
        label="CF-101"
      />

      <text
        x="770"
        y="450"
        textAnchor="middle"
        fill="#00bfff"
        fontSize="14"
        fontWeight="bold"
      >
        CARBON
      </text>

      {/* =====================================================
          PIPE TO UPPER TANK
      ====================================================== */}

      <Line x={810} y={320} length={50} direction="right" active={true} />

      {/* =====================================================
          UPPER TANK
      ====================================================== */}

      <Tank
        x={910}
        y={190}
        width={150}
        height={180}
        level={75}
        tag="LT-101"
        title="TANK ATAS"
      />

      {/* =====================================================
          UPPER TANK LEVEL
      ====================================================== */}

      <LevelMeter
        x={1080}
        y={200}
        width={30}
        height={160}
        value={75}
        tag="LT-101"
        title="LEVEL"
        unit="%"
      />

      {/* =====================================================
          DOWN PIPE
      ====================================================== */}

      <Line x={985} y={370} length={100} direction="down" active={true} />

      {/* =====================================================
          LOWER TANK
      ====================================================== */}

      <Tank
        x={910}
        y={490}
        width={150}
        height={180}
        level={60}
        tag="LT-102"
        title="TANK BAWAH"
      />

      {/* =====================================================
          LOWER TANK TO OUTLET
      ====================================================== */}

      <Line x={985} y={670} length={80} direction="down" active={true} />

      {/* =====================================================
          OUTLET VALVE
      ====================================================== */}

      <Valve
        x={985}
        y={750}
        width={70}
        height={70}
        tag="XV-102"
        label="OUTLET"
        open={true}
        direction="right"
      />

      {/* =====================================================
          PRESSURE TRANSMITTER
      ====================================================== */}

      <Transmitter
        x={900}
        y={750}
        type="PT"
        tag="PT-101"
        value={2.4}
        unit="bar"
      />

      {/* =====================================================
          PIPE TO PUMP
      ====================================================== */}

      <Line x={1055} y={750} length={100} direction="right" active={true} />

      {/* =====================================================
          PUMP
      ====================================================== */}

      <Pump
        x={1250}
        y={750}
        width={180}
        height={140}
        tag="P-101"
        running={true}
        fault={false}
        runtime={125}
        frequency={50}
        current={4.2}
        direction="right"
      />

      {/* =====================================================
          PROCESS STATUS
      ====================================================== */}

      <text
        x="750"
        y="870"
        textAnchor="middle"
        fill="#16a34a"
        fontSize="18"
        fontWeight="bold"
      >
        ● RAW WATER PROCESS RUNNING
      </text>
    </g>
  );
};

export default RungkutRawProcess;
