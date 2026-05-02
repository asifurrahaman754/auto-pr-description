import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function generatePRDescription(structuredData) {
  const url = `${API_URL.replace(/\/$/, "")}/api/pr/description`;
  const res = await axios.post(url, { structuredData });
  return res.data.description;
}
