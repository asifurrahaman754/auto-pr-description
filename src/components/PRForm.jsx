import React from "react";
import "./PRForm.css";

export default function PRForm({ prId, onChange, onSubmit, loading }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSubmit();
  }

  return (
    <div className="form-card">
      <div className="form-label-row">
        <label className="form-label" htmlFor="pr-input">
          Pull Request ID
        </label>
        <span className="form-hint">Enter the PR number from Bitbucket</span>
      </div>

      <div className="form-row">
        <div className="input-wrapper">
          <span className="input-prefix">#</span>
          <input
            id="pr-input"
            className="form-input"
            type="number"
            placeholder="e.g. 42"
            value={prId}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            min="1"
          />
        </div>

        <button
          className={`generate-btn ${loading ? "loading" : ""}`}
          onClick={onSubmit}
          disabled={loading || !prId}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Generating...
            </>
          ) : (
            <>
              <span className="btn-icon">⚡</span>
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
}
