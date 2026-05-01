import axios from "axios";

const BITBUCKET_USERNAME = import.meta.env.VITE_BITBUCKET_USERNAME;
const BITBUCKET_APP_PASSWORD = import.meta.env.VITE_BITBUCKET_APP_PASSWORD;
const WORKSPACE = import.meta.env.VITE_WORKSPACE;
const REPO_SLUG = import.meta.env.VITE_REPO_SLUG;

const bbHeaders = {
  Authorization: `Basic ${btoa(`${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}`)}`,
};

export async function getDiff(prId) {
  const url = `https://api.bitbucket.org/2.0/repositories/${WORKSPACE}/${REPO_SLUG}/pullrequests/${prId}/diff`;
  const res = await axios.get(url, { headers: bbHeaders });
  return res.data;
}

export async function updatePR(prId, description) {
  const url = `https://api.bitbucket.org/2.0/repositories/${WORKSPACE}/${REPO_SLUG}/pullrequests/${prId}`;
  await axios.put(
    url,
    { description },
    {
      headers: { ...bbHeaders, "Content-Type": "application/json" },
    },
  );
}
