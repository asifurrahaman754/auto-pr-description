# PR Description Generator
 
A lightweight developer tool that automatically generates structured Pull Request descriptions from your Bitbucket PR diff using AI (Groq + LLaMA 3.3).
 
No more writing PR descriptions from scratch — just enter your PR number and get a clean, consistent description in seconds.
 
---
 
## What it does
 
1. Fetches the diff of a Bitbucket Pull Request
2. Parses the changed files and actual code changes
3. Sends the diff to Groq's LLaMA 3.3 model
4. Returns a structured PR description following your team's template
5. Lets you copy it or push it directly back to the Bitbucket PR
