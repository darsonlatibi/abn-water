import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransport } from "../../lib/TransportFactory.js";
import Transmitter from "../MimicRO/Transmitter.jsx";
const ABNTransmitter = () => {
  const transport = useRef(null);

  const [pv, setPV] = useState(0);
  const [quality, setQuality] = useState("BAD");

  const [connection, setConnection] = useState("DISCONNECTED");
  const [message, setMessage] = useState("");

  const [calibration, setCalibration] = useState({
    zero: 0,
    span: 10,
    low: 4,
    high: 20,
  });

  useEffect(() => {
    console.log("INIT TRANSPORT");

    transport.current = createTransport("ESP");

    if (!transport.current) {
      console.error("Transport gagal dibuat");
      setConnection("ERROR");
      return;
    }

    // CONNECT TEST
    transport.current
      .connect()
      .then(() => {
        console.log("ESP CONNECTED");

        setConnection("CONNECTED");
      })
      .catch((err) => {
        console.error("ESP CONNECT ERROR", err);

        setConnection("FAILED");
      });

    // TEST SUBSCRIBE PT101

    transport.current.subscribe("PT101", (data) => {
      console.log("PT101 DATA :", data);

      if (data) {
        setPV(data.value);
        setQuality(data.quality || "GOOD");
      }
    });

    return () => {
      console.log("DISCONNECT ESP");

      transport.current?.disconnect();
    };
  }, []);
  return (
    <div className="w-full min-h-screen bg-slate-900 overflow-auto">
      <div
        className="card-header d-flex align-items-center justify-content-between text-white"
        style={{
          background: "#1f2937",
          borderBottom: "3px solid #0dcaf0",
          minHeight: "56px",
        }}
      >
        PT-101 TRANSMITTER CALIBRATION
      </div>
      <h4>
        ESP STATUS :<span className="ml-2">{connection}</span>
      </h4>
      <div className="flex gap-4 p-4">
        {/* =========================
          MIMIC TRANSMITTER
      ========================== */}
        <div className="bg-black flex-1">
          <svg
            viewBox="0 0 400 1500"
            width="100%"
            height="800"
            preserveAspectRatio="xMidYMin meet"
          >
            <Transmitter
              x={80}
              y={100}
              type="PT"
              tag="PT101"
              value={pv}
              quality={quality}
              unit="bar"
            />
          </svg>
        </div>

        {/* =========================
          CALIBRATION PANEL
      ========================== */}

        <div className="p-3 text-white bg-slate-800 rounded">
          <h5>PT-101 CALIBRATION</h5>

          <label>Zero (bar)</label>

          <input
            className="form-control"
            type="number"
            value={calibration.zero}
            onChange={(e) =>
              setCalibration({
                ...calibration,
                zero: Number(e.target.value),
              })
            }
          />

          <label className="mt-3">Span (bar)</label>

          <input
            className="form-control"
            type="number"
            value={calibration.span}
            onChange={(e) =>
              setCalibration({
                ...calibration,
                span: Number(e.target.value),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ABNTransmitter;
