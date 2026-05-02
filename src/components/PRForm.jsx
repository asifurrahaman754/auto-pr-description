import React from "react";
import "./PRForm.css";

export default function PRForm({
  prId,
  onChange,
  onSubmit,
  loading,
  project,
  onProjectChange,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSubmit();
  }

  return (
    <div className="form-card">
      <div className="form-label-row">
        <label className="form-label" htmlFor="project-input">
          Project (repo slug)
        </label>
        <span className="form-hint">Set repository slug (saved locally)</span>
      </div>

      <div className="form-row project-row">
        <input
          id="project-input"
          className="form-input"
          type="text"
          placeholder="e.g. emctech.app"
          value={project || ""}
          onChange={(e) => onProjectChange && onProjectChange(e.target.value)}
        />
      </div>

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
          disabled={loading || !prId || !project}
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
