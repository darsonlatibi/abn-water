import React, { useEffect, useRef } from "react";

import { useScadaStore } from "../../features/mimic/scadaStore.js";

import { useConnectTool } from "../../features/mimic/useConnectTool.js";

const NodeWrapper = ({ node, children }) => {
  const updateNodePosition = useScadaStore((s) => s.updateNodePosition);
  const mode = useScadaStore((s) => s.mode);
  const { handleNodeClick } = useConnectTool();

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (mode !== "edit") return;

    dragging.current = true;

    offset.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;

      updateNodePosition(
        node.id,
        e.clientX - offset.current.x,
        e.clientY - offset.current.y,
      );
    };

    const onMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [node.id, updateNodePosition]);

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseDown={onMouseDown}
      onClick={() => handleNodeClick(node.id)}
      style={{
        cursor: mode === "connect" ? "crosshair" : "grab",
      }}
      // 🔥 IMPORTANT ISOLATION
      pointerEvents="all"
    >
      {children}
    </g>
  );
};

export default NodeWrapper;
