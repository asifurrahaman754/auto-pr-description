import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function generatePRDescription(structuredData) {
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
- Summary: 1-2 sentences max, first person, no fluff
- Commit messages: one bullet per changed file, describe what you did (skip lock/generated files)
- AI Usage: mark "No" unless diff shows AI tool usage
- Use "Yes", "No", or "N/A" after each checklist item based on the diff
- Security implications: "Yes" if diff touches auth, env vars, secrets, headers, or permissions
- Performance: "Yes" if diff touches loops, queries, or data processing
- Edge cases: "Yes" if diff includes conditionals or error handling
- Code reviewed manually: always "Yes"
- Each Testing Evidence and Risks item must be on its own separate line with a blank line between them
- Risks & Testing: fill only what is visible from the diff, use "N/A" if not applicable
- Do NOT add extra sections or commentary outside the template
- Do NOT use "likely", "appears to", "this PR", or "third-person language"

---

### Summary
// What does this PR do?

**Commit messages**
// one bullet per file changed

---

### AI Usage Declaration

**Was AI used in this PR?**
- Yes / No

If yes:

**AI Tools Used**
//

**AI-Assisted Sections**
//

### Understanding & Ownership

Explain the AI-generated logic in your own words:
//

Key design decisions:
//

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

### AI Impact *(Optional but Recommended)*
* Estimated time saved:
* What would have taken longer without AI:

---

### Checklist (Must Pass Before Merge)
- I fully understand all code in this PR - Yes
- AI-generated code has been validated -
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

  return res.data.choices[0].message.content;
}
