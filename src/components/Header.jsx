import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-bracket">{`{`}</span>
          <span className="logo-text">PR</span>
          <span className="logo-bracket">{`}`}</span>
        </div>
        <div className="header-titles">
          <h1 className="header-title">PR Description Generator</h1>
          <p className="header-sub">Bitbucket · Groq · LLaMA 3.3</p>
        </div>
      </div>
      <div className="header-badge">v1.0</div>
    </header>
  );
}
