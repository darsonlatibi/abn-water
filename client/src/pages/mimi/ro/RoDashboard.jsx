import React from "react";
import { FaTint, FaFilter, FaCheckCircle, FaFilePdf } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const phData = [
  { day: "Sen", ph: 7.1 },
  { day: "Sel", ph: 7.2 },
  { day: "Rab", ph: 7.3 },
  { day: "Kam", ph: 7.1 },
  { day: "Jum", ph: 7.2 },
  { day: "Sab", ph: 7.2 },
  { day: "Min", ph: 7.3 },
];

const tdsData = [
  { day: "Sen", tds: 15 },
  { day: "Sel", tds: 18 },
  { day: "Rab", tds: 20 },
  { day: "Kam", tds: 16 },
  { day: "Jum", tds: 18 },
  { day: "Sab", tds: 19 },
  { day: "Min", tds: 17 },
];

const RoDashboard = () => {
  return (
    <div className="py-4">
      <h2 className="mb-4">
        <FaTint /> Dashboard Kualitas Air
      </h2>

      {/* Status */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>pH</h6>
              <h2>7.2</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>TDS</h6>
              <h2>18 ppm</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Suhu</h6>
              <h2>24°C</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm bg-success text-white">
            <div className="card-body text-center">
              <FaCheckCircle size={28} />
              <h6 className="mt-2">Layak Minum</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik PH */}

      <div className="card mb-4">
        <div className="card-header">Grafik pH 7 Hari</div>

        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ph" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grafik TDS */}

      <div className="card mb-4">
        <div className="card-header">Grafik TDS 7 Hari</div>

        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tdsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tds" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter */}

      <div className="card mb-4">
        <div className="card-header">
          <FaFilter /> Status Filter
        </div>

        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Sand Filter : OK</li>

            <li className="list-group-item">Carbon Filter : OK</li>

            <li className="list-group-item">RO Membrane : 85%</li>

            <li className="list-group-item">UV Sterilizer : OK</li>

            <li className="list-group-item">Next Service : 15 Juni 2026</li>
          </ul>
        </div>
      </div>

      {/* Lab */}

      <div className="card">
        <div className="card-header">Hasil Uji Laboratorium</div>

        <div className="card-body">
          <p>Pengujian terakhir : 28 Mei 2026</p>

          <button className="btn btn-danger">
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoDashboard;
