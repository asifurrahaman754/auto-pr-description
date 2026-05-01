import React, { useState } from "react";
import Header from "./components/Header.jsx";
import PRForm from "./components/PRForm.jsx";
import OutputBox from "./components/OutputBox.jsx";
import StatusBar from "./components/StatusBar.jsx";
import { getDiff, updatePR } from "./services/bitbucket.js";
import { summarizeDiff } from "./services/diffParser.js";
import { generatePRDescription } from "./services/groq.js";
import "./styles/App.css";

export default function App() {
  const [prId, setPrId] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [status, setStatus] = useState(null);

  function setMsg(type, message) {
    setStatus({ type, message });
  }

  async function handleGenerate() {
    if (!prId) return;
    setLoading(true);
    setOutput("");
    setStatus(null);

    try {
      setMsg("info", "Step 1/3 — Fetching diff from Bitbucket...");
      const diff = await getDiff(prId);

      setMsg("info", "Step 2/3 — Parsing diff...");
      const structured = summarizeDiff(diff);

      setMsg("info", "Step 3/3 — Generating description with LLaMA 3.3...");
      const description = await generatePRDescription(structured);

      setOutput(description);
      setMsg("success", "Description generated successfully!");
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        err.message ||
        "Something went wrong";
      setMsg("error", `Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  async function handlePush() {
    if (!output || !prId) return;
    setPushing(true);
    setMsg("info", "Pushing description to Bitbucket PR...");

    try {
      await updatePR(prId, output);
      setMsg("success", `PR #${prId} updated successfully on Bitbucket!`);
    } catch (err) {
      const msg =
        err.response?.data?.error?.message || err.message || "Push failed";
      setMsg("error", `Push failed: ${msg}`);
    } finally {
      setPushing(false);
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="main-inner">
          <PRForm
            prId={prId}
            onChange={setPrId}
            onSubmit={handleGenerate}
            loading={loading}
          />
          {status && <StatusBar status={status} />}
          <OutputBox
            output={output}
            onPushToBitbucket={handlePush}
            pushing={pushing}
          />
        </div>
      </main>
    </div>
  );
}
