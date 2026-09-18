import RungkutRawProcess from "../sections/rungkut/RungkutRawProcess";
import "./Rungkut.css";

export default function Rungkut() {
  return (
    <div className="rungkut-page w-full min-h-screen bg-slate-900 overflow-auto">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rungkut-header card-header d-flex align-items-center justify-content-between text-white">
        <div className="rungkut-header-side"></div>

        <div className="rungkut-header-title">
          {/*
          <h4 className="mb-0 fw-bold text-center">
            Rungkut
          </h4>
          */}
        </div>

        <div className="rungkut-header-side"></div>
      </div>

      {/* =====================================================
          MIMIC SVG
      ====================================================== */}

      <div className="rungkut-svg-container">
        <svg
          viewBox="0 0 1500 1000"
          width="100%"
          height="auto"
          className="rungkut-svg"
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
            RUNGKUT
          </text>
          <RungkutRawProcess />
        </svg>
      </div>
    </div>
  );
}
