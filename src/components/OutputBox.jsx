import React, { useState } from "react";
import "./OutputBox.css";

export default function OutputBox({ output, onPushToBitbucket, pushing }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="output-card">
      <div className="output-header">
        <div className="output-title-row">
          <span className="output-title">Generated Description</span>
          {output && (
            <span className="output-lines">
              {output.split("\n").length} lines
            </span>
          )}
        </div>

        {output && (
          <div className="output-actions">
            <button
              className={`action-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "✓ Copied" : "⎘ Copy"}
            </button>
            <button
              className={`action-btn push-btn ${pushing ? "loading" : ""}`}
              onClick={onPushToBitbucket}
              disabled={pushing}
            >
              {pushing ? (
                <>
                  <span className="spinner-sm" /> Pushing...
                </>
              ) : (
                "↑ Push to Bitbucket"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="output-body">
        {!output ? (
          <div className="output-empty">
            <div className="empty-icon">{"</>"}</div>
            <p className="empty-text">Enter a PR number and hit Generate</p>
            <p className="empty-sub">The description will appear here</p>
          </div>
        ) : (
          <pre className="output-content">{output}</pre>
        )}
      </div>
    </div>
  );
}
