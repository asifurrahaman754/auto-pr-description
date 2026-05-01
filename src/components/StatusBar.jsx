import React from "react";
import "./StatusBar.css";

export default function StatusBar({ status }) {
  if (!status) return null;

  return (
    <div className={`status-bar status-${status.type}`}>
      <span className="status-dot" />
      <span className="status-message">{status.message}</span>
    </div>
  );
}
