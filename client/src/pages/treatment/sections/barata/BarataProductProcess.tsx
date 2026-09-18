import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ElbowPipe from "../../../../components/MimicRO/ElbowPipe";
import UV from "../../../../components/MimicRO/UV";
import Line from "../../../../components/MimicRO/Line";
import WaterGallon from "../../../../components/MimicRO/WaterGallon";
import Button from "../../../../components/MimicRO/buttons/Button";
import QCTDS from "../../../../components/MimicRO/QC/QCTDS";
import Selector from "../../../../components/MimicRO/selector/Selector";
import CartButton from "../../../../components/MimicRO/buttons/CartButton";

import {
  fetchProducts,
  selectProducts,
} from "../../../../features/product/productsSlice";

import { addToCart } from "../../../../features/cart/cartSlice";

import type { AppDispatch } from "../../../../stores/store";

const BarataRawProcess: React.FC = () => {
  /* =========================================================
     REDUX
     ========================================================= */

  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);

  /* =========================================================
     LOCAL STATE
     ========================================================= */

  const [uv_101Mode, setUv_101Mode] = useState(false);
  const [productTDS, setProductTDS] = useState(18.4);

  /* =========================================================
     GALLON
     ========================================================= */

  const gallon = {
    x: 640,
    y: 680,
    w: 90,
    h: 120,
  };

  /* =========================================================
     PRODUCT ID
     ========================================================= */

  const WATER_GALLON_PRODUCT_ID = 1;

  /* =========================================================
     TDS SIMULATION
     ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setProductTDS((prev) => {
        const delta = (Math.random() - 0.5) * 0.6;

        const next = prev + delta;

        return Math.min(20.0, Math.max(17.0, next));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     ADD PRODUCT TO CART
     ========================================================= */

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const handleGallonClick = (productId: number) => {
  //   console.log("🛒 BELI PRODUCT:", productId);

  //   /* -------------------------------------------------------
  //      Cari product dari Redux
  //   ------------------------------------------------------- */

  //   const product = products.find((item) => item.id === productId);

  //   /* -------------------------------------------------------
  //      Product belum tersedia
  //   ------------------------------------------------------- */

  //   if (!product) {
  //     console.error("❌ PRODUCT TIDAK DITEMUKAN:", productId);

  //     return;
  //   }

  //   /* -------------------------------------------------------
  //      ADD TO CART
  //   ------------------------------------------------------- */

  //   dispatch(addToCart(product));

  //   console.log("✅ PRODUCT MASUK CART:", product.product_name);
  // };
  const handleGallonClick = (productId: number) => {
    console.log("=================================");
    console.log("🛒 ADD TO CART CLICK");
    console.log("Product ID:", productId);
    console.log("Products:", products);

    const product = products.find(
      (item) => Number(item.id) === Number(productId),
    );

    console.log("🔎 Product ditemukan:", product);

    if (!product) {
      console.error("❌ PRODUCT TIDAK DITEMUKAN:", productId);

      return;
    }

    dispatch(addToCart(product));

    console.log("✅ PRODUCT MASUK CART:", product.product_name);

    console.log("=================================");
  };
  return (
    <g id="barata-raw-process">
      {/* =====================================================
          PROCESS LINE
      ===================================================== */}

      <Line x={310} y={650} length={30} direction="right" active={true} />

      {/* =====================================================
          UV-101
      ===================================================== */}

      <UV
        x={350}
        y={620}
        width={140}
        height={60}
        label="UV-101"
        text="UV"
        active={true}
        flowActive={true}
        direction="right"
      />

      {/* =====================================================
          UV MODE
      ===================================================== */}

      <Selector
        x={380}
        y={570}
        width={80}
        height={20}
        radius={5}
        label=""
        leftLabel="AUTO"
        rightLabel="MAN"
        leftColor="#2563eb"
        rightColor="#f97316"
        tag="P-101-MODE"
        fontSize={8}
        value={uv_101Mode}
        onChange={setUv_101Mode}
      />

      {/* =====================================================
          PRODUCT TDS
      ===================================================== */}

      <QCTDS
        x={210}
        y={750}
        width={200}
        height={20}
        min={0}
        max={250}
        value={productTDS}
        title="PRODUCT WATER TDS"
        titleFontSize={14}
        valueFontSize={12}
        statusFontSize={12}
      />

      {/* =====================================================
          UV CONTROL
      ===================================================== */}

      {uv_101Mode && (
        <>
          <Button
            x={365}
            y={595}
            width={30}
            height={20}
            radius={5}
            fontSize={8}
            label="STOP"
            backgroundColor="#1e293b"
            pressedColor="#0f172a"
            borderColor="#38bdf8"
            labelColor="#ffffff"
            onClick={() => {
              console.log("UV STOP clicked");
            }}
          />

          <Button
            x={450}
            y={595}
            width={30}
            height={20}
            radius={5}
            fontSize={8}
            label="START"
            backgroundColor="#1e293b"
            pressedColor="#0f172a"
            borderColor="#38bdf8"
            labelColor="#ffffff"
            onClick={() => {
              console.log("UV START clicked");
            }}
          />
        </>
      )}

      {/* =====================================================
          PIPE
      ===================================================== */}

      <ElbowPipe
        x={495}
        y={650}
        width={50}
        height={30}
        direction="right-down"
      />

      {/* =====================================================
          WATER GALLONS
          Semua adalah PRODUCT ID 1
      ===================================================== */}

      <WaterGallon
        x={500}
        y={680}
        w={90}
        h={120}
        label="19 L"
        productId={WATER_GALLON_PRODUCT_ID}
        onClick={handleGallonClick}
      />

      <WaterGallon
        x={570}
        y={680}
        w={90}
        h={120}
        label="19 L"
        productId={WATER_GALLON_PRODUCT_ID}
        onClick={handleGallonClick}
      />

      <WaterGallon
        x={640}
        y={680}
        w={90}
        h={120}
        label="19 L"
        productId={WATER_GALLON_PRODUCT_ID}
        onClick={handleGallonClick}
      />

      {/* =====================================================
          CART BUTTON
          Mengacu ke GALON TERAKHIR
      ===================================================== */}

      <CartButton
        x={gallon.x + gallon.w - 5}
        y={gallon.y - 35}
        w={60}
        h={40}
        iconSize={20}
        productId={WATER_GALLON_PRODUCT_ID}
        onClick={handleGallonClick}
      />

      {/* =====================================================
          PAYMENT
      ===================================================== */}
    </g>
  );
};

export default BarataRawProcess;
