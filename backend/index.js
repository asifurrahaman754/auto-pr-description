const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const {
  getDiff: bbGetDiff,
  getPRDetails: bbGetPRDetails,
  updatePR: bbUpdatePR,
} = require("./services/bitbucket");
const { generatePRDescriptionWithGroq } = require("./services/groq");
const { summarizeDiff } = require("./services/diffParser");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Fetch diff from Bitbucket using backend secrets
app.get("/api/pr/:prId/diff", async (req, res) => {
  try {
    const { prId } = req.params;
    const repo = req.query.repo || process.env.REPO_SLUG;
    const diff = await bbGetDiff(prId, repo);
    res.send(diff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate PR description: accepts structuredData or will fetch diff and parse
app.post("/api/pr/description", async (req, res) => {
  try {
    const { structuredData, prId, repo } = req.body;

    let structured = structuredData;
    let prTitle = "";
    
    if (!structured) {
      if (!prId)
        return res
          .status(400)
          .json({ error: "prId required when structuredData not provided" });
      if (!repo)
        return res
          .status(400)
          .json({ error: "repo required" });
      const [diff, prDetails] = await Promise.all([
        bbGetDiff(prId, repo),
        bbGetPRDetails(prId, repo),
      ]);
      structured = summarizeDiff(diff);
      prTitle = prDetails.title;
    }

    const description = await generatePRDescriptionWithGroq(structured, prTitle);
    res.json({ description });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// Update PR description on Bitbucket
app.put("/api/pr/:prId", async (req, res) => {
  try {
    const { prId } = req.params;
    const { description, repo } = req.body;
    if (!description)
      return res.status(400).json({ error: "description required" });
    await bbUpdatePR(prId, description, repo || process.env.REPO_SLUG);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`autopr backend listening on port ${PORT}`);
});
