const axios = require("axios");
require("dotenv").config();

const BITBUCKET_USERNAME = process.env.BITBUCKET_USERNAME;
const BITBUCKET_APP_PASSWORD = process.env.BITBUCKET_APP_PASSWORD;
const WORKSPACE = process.env.WORKSPACE;

if (!BITBUCKET_USERNAME || !BITBUCKET_APP_PASSWORD || !WORKSPACE) {
  // do not throw — allow deployers to set values; but warn
  console.warn("Bitbucket credentials or workspace not set in env");
}

function authHeader() {
  const token = Buffer.from(
    `${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}`,
  ).toString("base64");
  return { Authorization: `Basic ${token}` };
}

async function getDiff(prId, repoSlug) {
  const repo = repoSlug;
  const url = `https://api.bitbucket.org/2.0/repositories/${WORKSPACE}/${repo}/pullrequests/${prId}/diff`;
  const res = await axios.get(url, {
    headers: authHeader(),
    responseType: "text",
  });
  return res.data;
}

async function updatePR(prId, description, repoSlug) {
  const repo = repoSlug;
  const url = `https://api.bitbucket.org/2.0/repositories/${WORKSPACE}/${repo}/pullrequests/${prId}`;
  await axios.put(
    url,
    { description },
    { headers: { ...authHeader(), "Content-Type": "application/json" } },
  );
}

module.exports = { getDiff, updatePR };
