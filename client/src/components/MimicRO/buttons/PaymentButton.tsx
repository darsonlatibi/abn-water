
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../stores/store";
import { createPayment } from "../../../features/payment/paymentSlice";

import Button from "./Button";

// =====================================================
// MIDTRANS SNAP TYPE
// =====================================================

interface SnapResult {
  order_id?: string;
  transaction_id?: string;
  transaction_status?: string;
  payment_type?: string;
  [key: string]: unknown;
}

// =====================================================
// PAYMENT BUTTON PROPS
// =====================================================

interface PaymentButtonProps {
  // ===================================================
  // SVG POSITION
  // ===================================================

  x?: number;
  y?: number;

  // ===================================================
  // SIZE
  // ===================================================

  width?: number;
  height?: number;

  // ===================================================
  // PAYMENT
  // ===================================================

  /**
   * Hanya untuk display/log.
   *
   * Nominal pembayaran TIDAK dikirim
   * ke backend payment.
   */
  amount: number;

  /**
   * ID primary key dari tabel orders.
   *
   * Harus berasal dari order yang sudah
   * berhasil dibuat di backend.
   */
  orderId: number | string;

  label?: string;
  disabled?: boolean;

  // ===================================================
  // MODE
  //
  // svg  = Mimic SVG
  // html = CartPanel
  // ===================================================

  mode?: "svg" | "html";

  // ===================================================
  // CALLBACK
  // ===================================================

  onSuccess?: (result: SnapResult) => void;
  onPending?: (result: SnapResult) => void;
  onError?: (result: SnapResult) => void;
  onClose?: () => void;
}

// =====================================================
// MIDTRANS SNAP
// =====================================================

interface MidtransSnap {
  pay: (
    token: string,
    callbacks: {
      onSuccess?: (result: SnapResult) => void;
      onPending?: (result: SnapResult) => void;
      onError?: (result: SnapResult) => void;
      onClose?: () => void;
    },
  ) => void;
}

declare global {
  interface Window {
    snap?: MidtransSnap;
  }
}

// =====================================================
// PAYMENT BUTTON
// =====================================================

const PaymentButton: React.FC<PaymentButtonProps> = ({
  x = 0,
  y = 0,

  width = 140,
  height = 45,

  amount,
  orderId,

  label = "BAYAR",
  disabled = false,

  mode = "svg",

  onSuccess,
  onPending,
  onError,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  // ===================================================
  // PAYMENT
  // ===================================================

  const handlePayment = async () => {
    console.log("🟢 BAYAR CLICKED");

    // =================================================
    // GUARD
    // =================================================

    if (loading || disabled) {
      console.log("⚠️ Button disabled/loading");
      return;
    }

    // =================================================
    // ORDER VALIDATION
    // =================================================

    if (
      orderId === undefined ||
      orderId === null ||
      String(orderId).trim() === ""
    ) {
      console.error(
        "❌ ORDER ID tidak tersedia:",
        orderId,
      );

      alert(
        "Order belum dibuat. Silakan checkout terlebih dahulu.",
      );

      return;
    }

    // =================================================
    // AMOUNT DISPLAY VALIDATION
    // =================================================

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      console.error(
        "❌ AMOUNT DISPLAY tidak valid:",
        amount,
      );

      alert(
        "Nominal order tidak valid.",
      );

      return;
    }

    // =================================================
    // MIDTRANS CHECK
    // =================================================

    if (!window.snap) {
      console.error(
        "❌ window.snap BELUM tersedia",
      );

      alert(
        "Midtrans Snap belum siap. Silakan tunggu beberapa detik.",
      );

      return;
    }

    console.log(
      "✅ window.snap tersedia",
    );

    try {
      setLoading(true);

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "====================================",
      );

      console.log(
        "📡 CREATE PAYMENT",
      );

      console.log(
        "ORDER ID:",
        orderId,
      );

      console.log(
        "ORDER ID TYPE:",
        typeof orderId,
      );

      console.log(
        "AMOUNT DISPLAY:",
        amount,
      );

      console.log(
        "====================================",
      );

      // =================================================
      // CREATE PAYMENT
      //
      // HANYA orderId DIKIRIM.
      //
      // Backend mengambil:
      // orders.grand_total
      //
      // =================================================

      const result = await dispatch(
        createPayment({
          orderId,
        }),
      ).unwrap();

      // =================================================
      // PAYMENT CREATED
      // =================================================

      console.log(
        "✅ PAYMENT CREATED:",
        result,
      );

      console.log(
        "🎫 SNAP TOKEN:",
        result.snapToken,
      );

      if (!result.snapToken) {
        throw new Error(
          "Snap token tidak diterima dari server.",
        );
      }

      // =================================================
      // OPEN MIDTRANS SNAP
      // =================================================

      console.log(
        "🚀 OPEN MIDTRANS SNAP",
      );

      window.snap.pay(
        result.snapToken,
        {
          // =============================================
          // SUCCESS
          // =============================================

          onSuccess: (
            paymentResult,
          ) => {
            console.log(
              "✅ PAYMENT SUCCESS:",
              paymentResult,
            );

            setLoading(false);

            onSuccess?.(
              paymentResult,
            );
          },

          // =============================================
          // PENDING
          // =============================================

          onPending: (
            paymentResult,
          ) => {
            console.log(
              "⏳ PAYMENT PENDING:",
              paymentResult,
            );

            setLoading(false);

            onPending?.(
              paymentResult,
            );
          },

          // =============================================
          // ERROR
          // =============================================

          onError: (
            paymentResult,
          ) => {
            console.error(
              "❌ PAYMENT ERROR:",
              paymentResult,
            );

            setLoading(false);

            onError?.(
              paymentResult,
            );
          },

          // =============================================
          // CLOSE
          // =============================================

          onClose: () => {
            console.log(
              "🔴 PAYMENT WINDOW CLOSED",
            );

            setLoading(false);

            onClose?.();
          },
        },
      );
    } catch (error) {
      console.error(
        "❌ PAYMENT CREATE ERROR:",
        error,
      );

      setLoading(false);

      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Gagal membuat transaksi pembayaran.";

      alert(message);
    }
  };

  // ===================================================
  // COMMON STATE
  // ===================================================

  const isDisabled =
    disabled || loading;

  // ===================================================
  // HTML MODE
  // ===================================================

  if (mode === "html") {
    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={handlePayment}
        style={{
          width: `${width}px`,
          minHeight: `${height}px`,
          border: "1px solid #22c55e",
          borderRadius: "8px",
          background: isDisabled
            ? "#94a3b8"
            : "#16a34a",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 700,
          cursor: isDisabled
            ? "not-allowed"
            : "pointer",
          transition:
            "all 0.15s ease",
        }}
      >
        {loading
          ? "MEMPROSES..."
          : label}
      </button>
    );
  }

  // ===================================================
  // SVG MODE
  // ===================================================

  return (
    <Button
      x={x}
      y={y}
      width={width}
      height={height}
      radius={8}
      label={
        loading
          ? "MEMPROSES..."
          : label
      }
      fontSize={14}
      backgroundColor="#16a34a"
      pressedColor="#15803d"
      borderColor="#22c55e"
      labelColor="#ffffff"
      disabled={isDisabled}
      onClick={handlePayment}
    />
  );
};

export default PaymentButton;
