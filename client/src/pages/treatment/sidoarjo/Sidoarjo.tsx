import SidoarjoRawProcess from "../sections/sidoarjo/SidoarjoRawProcess";
import "./Sidoarjo.css";

export default function Sidoarjo() {
  return (
    <div className="sidoarjo-page w-full min-h-screen bg-slate-900 overflow-auto">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="sidoarjo-header card-header d-flex align-items-center justify-content-between text-white">
        <div className="sidoarjo-header-side"></div>

        <div className="sidoarjo-header-title">
          {/*
          <h4 className="mb-0 fw-bold text-center">
            Sidoarjo
          </h4>
          */}
        </div>

        <div className="sidoarjo-header-side"></div>
      </div>

      {/* =====================================================
          MIMIC SVG
      ====================================================== */}

      <div className="sidoarjo-svg-container">
        <svg
          viewBox="0 0 1500 1000"
          width="100%"
          height="auto"
          className="sidoarjo-svg"
          preserveAspectRatio="xMidYMin meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* =====================================================
          TITLE
      ====================================================== */}

          <text
            x="750"
            y="50"
            textAnchor="middle"
            fill="#00bfff"
            fontSize="28"
            fontWeight="bold"
          >
            SIDOARJO
          </text>

          <SidoarjoRawProcess />
        </svg>
      </div>
    </div>
  );
}
