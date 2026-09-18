import React, { useEffect, useState } from "react";
import Tank from "../../../../components/MimicRO/Tank";
import Valve from "../../../../components/MimicRO/Valve";
import Line from "../../../../components/MimicRO/Line";
import LevelMeter from "../../../../components/MimicRO/level/LevelMeter";
import Transmitter from "../../../../components/MimicRO/Transmitter";
import MembraneVertical from "../../../../components/MimicRO/MembraneVertical";
import ElbowPipe from "../../../../components/MimicRO/ElbowPipe";
import Ventury from "../../../../components/MimicRO/Ventury";
import Button from "../../../../components/MimicRO/buttons/Button";
import QCTDS from "../../../../components/MimicRO/QC/QCTDS";

const BarataRawProcess: React.FC = () => {
  const [pt101, setPt101] = useState(2.4);
  const [pt102, setPt102] = useState(2.38);
  const [pt103, setPt103] = useState(2.36);
  const [pt104, setPt104] = useState(2.34);

  const [rawTankLevel, setRawTankLevel] = useState(72);
  const [rawTDS, setRawTDS] = useState(18.4);

  useEffect(() => {
    const interval = setInterval(() => {
      // =====================================================
      // PRESSURE TRANSMITTER
      // =====================================================

      const fluctuatePressure = (prev: number, min: number, max: number) => {
        // ±0.01 bar
        const delta = (Math.random() - 0.5) * 0.02;

        const next = prev + delta;

        return Math.min(max, Math.max(min, next));
      };

      setPt101((prev) => fluctuatePressure(prev, 3.4, 3.6));

      setPt102((prev) => fluctuatePressure(prev, 3.25, 3.45));

      setPt103((prev) => fluctuatePressure(prev, 3.1, 3.3));

      setPt104((prev) => fluctuatePressure(prev, 2.95, 3.15));

      setRawTDS((prev) => {
        // Perubahan kecil ±0.3 ppm
        const delta = (Math.random() - 0.5) * 0.6;

        const next = prev + delta;

        // Range GOOD: 17.0 - 20.0 ppm
        return Math.min(20.0, Math.max(17.0, next));
      });

      // =====================================================
      // RAW WATER TANK LEVEL
      // =====================================================

      setRawTankLevel((prev) => {
        // perubahan kecil ±0.1%
        const delta = (Math.random() - 0.5) * 0.2;

        const next = prev + delta;

        // range 68 - 76 %
        return Math.min(76, Math.max(68, next));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <g id="barata-raw-process">
        {/* =====================================================
          PDAM INLET
      ====================================================== */}

        <text
          x="70"
          y="180"
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

        <Line x={110} y={200} length={40} direction="right" active={true} />

        {/* =====================================================
          INLET VALVE
      ====================================================== */}

        <Valve
          x={170}
          y={200}
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

        <Line x={200} y={200} length={50} direction="right" active={true} />
        <Transmitter
          x={240}
          y={150}
          type="PT"
          tag="PT-101"
          value={pt101}
          unit="bar"
        />
        {/* =====================================================
          SILICA FILTER
      ====================================================== */}
        <ElbowPipe
          x={250}
          y={200}
          width={40}
          height={40}
          direction="right-down"
        />
        <MembraneVertical
          x={270}
          y={220}
          width={40}
          height={150}
          label="SF-101"
        />
        <ElbowPipe
          x={310}
          y={360}
          width={30}
          height={160}
          direction="right-up"
        />

        <ElbowPipe
          x={345}
          y={200}
          width={55}
          height={20}
          direction="right-down"
        />
        <Transmitter
          x={370}
          y={150}
          type="PT"
          tag="PT-102"
          value={pt102}
          unit="bar"
        />
        <MembraneVertical
          x={380}
          y={220}
          width={40}
          height={150}
          label="CF-101"
        />
        <ElbowPipe
          x={420}
          y={360}
          width={30}
          height={160}
          direction="right-up"
        />
        <ElbowPipe
          x={450}
          y={200}
          width={60}
          height={20}
          direction="right-down"
        />
        <Transmitter
          x={480}
          y={150}
          type="PT"
          tag="PT-103"
          value={pt103}
          unit="bar"
        />
        <MembraneVertical
          x={490}
          y={220}
          width={40}
          height={150}
          label="MF-101"
        />

        <ElbowPipe
          x={530}
          y={360}
          width={30}
          height={160}
          direction="right-up"
        />
        <ElbowPipe
          x={560}
          y={200}
          width={80}
          height={30}
          direction="right-down"
        />
        <Transmitter
          x={600}
          y={150}
          type="PT"
          tag="PT-104"
          value={pt104}
          unit="bar"
        />
        <Ventury
          x={750}
          y={140}
          width={100}
          height={20}
          direction="down"
          label="VENT-101"
          active={true}
        />
        <Tank
          x={620}
          y={240}
          width={150}
          height={200}
          level={rawTankLevel}
          tag="LT-101"
          title="TANK BAWAH"
        />
        <QCTDS
          x={610}
          y={540}
          width={150}
          height={20}
          min={0}
          max={200}
          value={rawTDS}
          title="RAW WATER TDS"
          titleFontSize={14}
          valueFontSize={12}
          statusFontSize={12}
        />
        {/* =====================================================
          UPPER TANK LEVEL
      ====================================================== */}

        <LevelMeter
          x={780}
          y={240}
          width={30}
          height={200}
          value={rawTankLevel}
          tag="LT-101"
          title="LEVEL"
          unit="%"
          scalePosition="right"
        />
        <Valve
          x={640}
          y={465}
          width={70}
          height={70}
          tag="XV-103"
          label=""
          open={true}
          direction="down"
        />
        {/* =====================================================
          OUTLET VALVE
      ====================================================== */}
        <Line x={620} y={430} length={30} direction="left" active={true} />
        <Valve
          x={560}
          y={430}
          width={70}
          height={70}
          tag="XV-102"
          label="OUTLET"
          open={true}
          direction="right"
        />

        <Button
          x={480}
          y={460}
          width={30}
          height={30}
          radius={5}
          fontSize={8}
          label="START"
          backgroundColor="#1e293b"
          pressedColor="#0f172a"
          borderColor="#38bdf8"
          labelColor="#ffffff"
          onClick={() => {
            console.log("START clicked");
          }}
        />
        <Button
          x={380}
          y={460}
          width={30}
          height={30}
          radius={5}
          fontSize={8}
          label="STOP"
          backgroundColor="#1e293b"
          pressedColor="#0f172a"
          borderColor="#38bdf8"
          labelColor="#ffffff"
          onClick={() => {
            console.log("STOP clicked");
          }}
        />
      </g>
    </>
  );
};

export default BarataRawProcess;
