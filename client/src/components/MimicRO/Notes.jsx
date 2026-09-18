import React from "react";

const Notes = ({
  x = 20,
  y = 500,
  ph = 7,
  tdsIn = 0,
  tdsOut = 0,
  pressureFeed = 0,
  pressureMembrane = 0,
  recoveryRate = 0,
  rejectionRate = 0,
  flowRate = 0,
  temperature = 25,
}) => {
  const notes = [];

  // =========================
  // WATER QUALITY
  // =========================

  if (ph < 6.5)
    notes.push("pH rendah, periksa dosing chemical atau kualitas air baku.");

  if (ph > 8.5) notes.push("pH tinggi, evaluasi sistem pretreatment.");

  if (tdsOut > 20)
    notes.push(
      "TDS produk tinggi, indikasi fouling atau kerusakan membran RO.",
    );

  if (rejectionRate < 95)
    notes.push("Rejection rate menurun, lakukan inspeksi membran.");

  // =========================
  // PRESSURE
  // =========================

  if (pressureMembrane > 15)
    notes.push("Tekanan membran tinggi, kemungkinan scaling atau fouling.");

  if (pressureFeed < 2)
    notes.push("Tekanan feed rendah, periksa pompa atau suplai air baku.");

  // =========================
  // RECOVERY
  // =========================

  if (recoveryRate > 80)
    notes.push("Recovery terlalu tinggi, risiko scaling meningkat.");

  if (recoveryRate < 40)
    notes.push("Recovery rendah, efisiensi sistem belum optimal.");

  // =========================
  // FLOW
  // =========================

  if (flowRate <= 0) notes.push("Tidak ada aliran air terdeteksi.");

  // =========================
  // TEMPERATURE
  // =========================

  if (temperature > 35)
    notes.push("Temperatur tinggi dapat mempercepat degradasi membran.");

  // =========================
  // NORMAL
  // =========================

  if (notes.length === 0) {
    notes.push("Kualitas air dan kondisi operasi berada dalam batas normal.");
  }
  const panelHeight = Math.max(140, 50 + notes.length * 18);
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x="0"
        y="0"
        width="500"
        height="140"
        rx="8"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      <rect
        x="0"
        y="0"
        width="500"
        height={panelHeight}
        rx="8"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      <text x="250" y="18" fill="#ffffff" textAnchor="middle" fontWeight="bold">
        OPERATOR NOTES
      </text>

      {notes.map((note, idx) => (
        <text key={idx} x="15" y={50 + idx * 18} fill="#00ffff" fontSize="12">
          • {note}
        </text>
      ))}
    </g>
  );
};

export default Notes;
