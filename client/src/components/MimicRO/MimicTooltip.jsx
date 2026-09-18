const MimicTooltip = ({ tooltip }) => {
  if (!tooltip.visible || !tooltip.data) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: tooltip.x + 10,
        top: tooltip.y + 10,
        background: "#111",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #444",
        zIndex: 9999,
        minWidth: "180px",
        pointerEvents: "none",
      }}
    >
      <div>
        <strong>{tooltip.data.tag}</strong>
      </div>

      {Object.entries(tooltip.data).map(([key, value]) => {
        if (key === "tag") return null;

        return (
          <div key={key}>
            {key}: {String(value)}
          </div>
        );
      })}
    </div>
  );
};

export default MimicTooltip;
