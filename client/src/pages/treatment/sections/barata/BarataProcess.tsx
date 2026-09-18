import React, { useEffect, useState } from "react";
import Tank from "../../../../components/MimicRO/Tank";
import Valve from "../../../../components/MimicRO/Valve";
import LevelMeter from "../../../../components/MimicRO/level/LevelMeter";
import Ventury from "../../../../components/MimicRO/Ventury";
import Pump from "../../../../components/MimicRO/Pump";
import ElbowPipe from "../../../../components/MimicRO/ElbowPipe";
import Transmitter from "../../../../components/MimicRO/Transmitter";

const BarataRawProcess: React.FC = () => {
  const [ft101, setFt101] = useState(2.4);
  const [productTankLevel, setProductTankLevel] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      // =====================================================
      // FT-101 FLOW
      // =====================================================

      const fluctuateFlow = (prev: number, min: number, max: number) => {
        const delta = (Math.random() - 0.5) * 0.02;

        const next = prev + delta;

        return Math.min(max, Math.max(min, next));
      };

      setFt101((prev) => fluctuateFlow(prev, 2.35, 2.45));

      // =====================================================
      // PRODUCT TANK LEVEL
      // =====================================================

      setProductTankLevel((prev) => {
        // perubahan kecil ±0.1%
        const delta = (Math.random() - 0.5) * 0.2;

        const next = prev + delta;

        return Math.min(85, Math.max(65, next));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <g id="barata-raw-process">
      <Pump x={445} y={430} tag="P-101" running={false} fault={false} />
      <ElbowPipe
        x={360}
        y={430}
        width={130}
        height={30}
        direction="left-down"
      />
      <Transmitter
        x={230}
        y={390}
        type="FT"
        tag="FT-102"
        value={ft101}
        unit="l/m"
      />
      <Ventury
        x={120}
        y={360}
        width={100}
        height={20}
        direction="down"
        label="VENT-102"
        active={true}
      />
      <Tank
        x={100}
        y={460}
        width={150}
        height={200}
        level={productTankLevel}
        tag="LT-102"
        title="TANK BAWAH"
      />

      <LevelMeter
        x={30}
        y={460}
        width={40}
        height={200}
        value={productTankLevel}
        scalePosition="left"
        scaleGap={8}
        scaleWidth={12}
        scaleLabelGap={6}
      />

      <Valve
        x={120}
        y={690}
        width={70}
        height={70}
        tag="XV-104"
        label=""
        open={true}
        direction="down"
      />
      <Valve
        x={280}
        y={650}
        width={70}
        height={70}
        tag="XV-105"
        label="Product"
        open={true}
        direction="right"
      />
    </g>
  );
};

export default BarataRawProcess;
