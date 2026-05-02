import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDiff(prId, repoSlug) {
  const url = `${API_URL.replace(/\/$/, "")}/api/pr/${encodeURIComponent(prId)}/diff`;
  const res = await axios.get(url, { params: { repo: repoSlug } });
  return res.data;
}

export async function updatePR(prId, description, repoSlug) {
  const url = `${API_URL.replace(/\/$/, "")}/api/pr/${encodeURIComponent(prId)}`;
  await axios.put(url, { description, repo: repoSlug });
}
