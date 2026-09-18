import AuthInitializer from "../components/auth/AuthInitializer";
import { useMidtransSnap } from "../hooks/useMidtransSnap";
import AppRouter from "./router";

export default function App() {
  useMidtransSnap();
  return (
    <>
      {/* ===================================================
          AUTH INITIALIZER
          =================================================== */}

      <AuthInitializer />

      {/* ===================================================
          APPLICATION ROUTER
          =================================================== */}
      <AppRouter />
    </>
  );
}
