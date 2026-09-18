import { useEffect } from "react";

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY as string;

const MIDTRANS_ENV = (import.meta.env.VITE_MIDTRANS_ENV as string) || "sandbox";

export const useMidtransSnap = () => {
  useEffect(() => {
    // =====================================================
    // SNAP SUDAH TERSEDIA
    // =====================================================

    if (window.snap) {
      console.log("✅ Midtrans Snap already available");
      return;
    }

    // =====================================================
    // CLIENT KEY
    // =====================================================

    if (!MIDTRANS_CLIENT_KEY) {
      console.error("❌ VITE_MIDTRANS_CLIENT_KEY belum dikonfigurasi.");
      return;
    }

    // =====================================================
    // CEK SCRIPT YANG SUDAH ADA
    // =====================================================

    const existingScript = document.querySelector(
      'script[data-midtrans-snap="true"]',
    );

    if (existingScript) {
      console.log("⏳ Midtrans Snap script already loading...");

      return;
    }

    // =====================================================
    // CREATE SNAP SCRIPT
    // =====================================================

    const script = document.createElement("script");

    script.src =
      MIDTRANS_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";

    script.async = true;

    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);

    script.setAttribute("data-midtrans-snap", "true");

    // =====================================================
    // LOAD
    // =====================================================

    script.onload = () => {
      console.log("✅ Midtrans Snap ready");
    };

    // =====================================================
    // ERROR
    // =====================================================

    script.onerror = () => {
      console.error("❌ Gagal memuat Midtrans Snap.");
    };

    // =====================================================
    // APPEND
    // =====================================================

    document.body.appendChild(script);

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);
};
