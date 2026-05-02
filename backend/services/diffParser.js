function summarizeDiff(diffText) {
  const files = [];
  const fileBlocks = diffText.split("diff --git");

  for (let block of fileBlocks) {
    const fileMatch = block.match(/a\/(.+?) b\/(.+)/);
    if (!fileMatch) continue;

    const fileName = fileMatch[2];

    if (
      fileName.match(/\.(lock|snap|min\.js|map)$/) ||
      fileName.includes("yarn.lock")
    ) {
      files.push({
        file: fileName,
        note: "dependency/generated file, skipped",
      });
      continue;
    }

    const addedLines = (block.match(/^\+(?!\+\+).+/gm) || [])
      .map((l) => l.slice(1).trim())
      .filter((l) => l.length > 0)
      .slice(0, 20);

    const removedLines = (block.match(/^-(?!--).+/gm) || [])
      .map((l) => l.slice(1).trim())
      .filter((l) => l.length > 0)
      .slice(0, 20);

    const additions = (block.match(/^\+/gm) || []).length;
    const deletions = (block.match(/^- /gm) || []).length;

    files.push({
      file: fileName,
      additions,
      deletions,
      addedLines,
      removedLines,
    });
  }

  return files.slice(0, 15);
}

module.exports = { summarizeDiff };
