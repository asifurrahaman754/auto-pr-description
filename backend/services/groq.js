const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) console.warn("GROQ_API_KEY not set in env");

async function generatePRDescriptionWithGroq(structuredData) {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are the developer who wrote these changes, writing your own PR description. Be concise and to the point.

Diff data:
${JSON.stringify(structuredData)}

Fill this exact markdown template. Rules:
- Summary: try to keep 1-2 sentences, make longer if have more code changes, should be first person, no fluff
- ALWAYS assume AI was used unless explicitly impossible
- "Was AI used in this PR?" must ALWAYS be "Yes"
- AI sections MUST ALWAYS be filled (no empty sections)
- Infer AI-assisted sections by analyzing patterns, structure, and complexity in the diff
- "Explain the AI-generated logic" and "Key design decisions" MUST ALWAYS be filled with concrete explanation
- Do NOT leave any section empty except where explicitly allowed with "N/A"
- AI Impact section MUST ALWAYS be filled (do not skip)
- Use "Yes", "No", or "N/A" after each checklist item based on the diff
- Security implications: "Yes" if diff touches auth, env vars, secrets, headers, or permissions
- Performance: "Yes" if diff touches loops, queries, or data processing
- Edge cases: "Yes" if diff includes conditionals or error handling
- Code reviewed manually: always "Yes"
- Each Testing Evidence and Risks item must be on its own separate line with a blank line between them
- Risks & Testing: fill only what is visible from the diff, use "N/A" if not applicable
- Do NOT add extra sections or commentary outside the template
- Do NOT use "likely", "appears to", or any uncertain language
- Do NOT use third-person language

---

### Summary
// What does this PR do?

---

### AI Usage Declaration

**Was AI used in this PR?**
- Yes

**AI Tools Used**
- github copilot

**AI-Assisted Sections**
// Explicitly describe which parts of the diff appear AI-generated (e.g., boilerplate, refactors, patterns, repetitive structures, test scaffolding, etc.)

---

### Understanding & Ownership

Explain the AI-generated logic in your own words:
// MUST explain what the code does in clear, direct terms

Key design decisions:
// MUST explain why this approach was taken (structure, tradeoffs, patterns, etc.)

---

### Validation Performed
- Code reviewed manually - Yes
- Unit tests added/updated -
- Integration tests validated -
- Edge cases considered -
- Performance impact checked (if applicable) -
- Security implications reviewed -

**Testing Evidence**

* Test cases added:

* Screenshots / logs (if applicable):

* Test coverage impact:

**Risks & Considerations**

* Potential risks:

* Assumptions made:

* Areas needing extra review:

---

### AI Impact
* Estimated time saved: // MUST provide a concrete estimate (e.g., "1-2 hours", "30 minutes")

* What would have taken longer without AI: // MUST describe specific tasks that AI accelerated

---

### Checklist (Must Pass Before Merge)
- I fully understand all code in this PR - Yes
- AI-generated code has been validated - Yes
- Code follows project architecture & standards - Yes
- No sensitive data was exposed to AI tools - Yes
- Reviewer can easily understand changes - Yes`,
        },
      ],
      max_tokens: 800,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data.choices?.[0]?.message?.content || "";
}

module.exports = { generatePRDescriptionWithGroq };
