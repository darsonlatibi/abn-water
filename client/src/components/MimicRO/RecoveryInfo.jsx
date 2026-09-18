const RecoveryInfo = ({
  x = 0,
  y = 0,
  recoveryRate = 0,
  rejectionRate = 0,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text x="0" y="0" fill="#00ff88" fontSize="12" fontWeight="bold">
        RECOVERY {recoveryRate}%
      </text>

      <text x="0" y="18" fill="#00ffff" fontSize="12">
        REJECTION {rejectionRate}%
      </text>
    </g>
  );
};

export default RecoveryInfo;
