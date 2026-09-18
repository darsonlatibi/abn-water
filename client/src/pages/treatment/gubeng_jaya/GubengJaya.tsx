import GubengJayaRawProcess from "../sections/gubeng_jaya/GubengJayaRawProcess";

import "./GubengJaya.css";

export default function GubengJaya() {
  return (
    <div className="gubeng-jaya-page w-full min-h-screen bg-slate-900 overflow-auto">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="gubeng-jaya-header card-header d-flex align-items-center justify-content-between text-white">
        <div className="gubeng-jaya-header-side"></div>

        <div className="gubeng-jaya-header-title">
          {/*
          <h4 className="mb-0 fw-bold text-center">
            Gubeng Jaya
          </h4>
          */}
        </div>

        <div className="gubeng-jaya-header-side"></div>
      </div>

      {/* =====================================================
          MIMIC SVG
      ====================================================== */}

      <div className="gubeng-jaya-svg-container">
        <svg
          viewBox="0 0 1500 1000"
          width="100%"
          height="auto"
          className="gubeng-jaya-svg"
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
            GUBENG JAYA
          </text>
          <GubengJayaRawProcess />
        </svg>
      </div>
    </div>
  );
}
