const fs = require("fs");
const path = require("path");

// Folder to scan
const directory = path.join(__dirname, "../YAML_Templates");

// Get all files in the folder
const files = fs
  .readdirSync(directory)
  .filter(file => {
    const fullPath = path.join(directory, file);
    return fs.statSync(fullPath).isFile();
  });

// Create JSON output
const outputPath = path.join(__dirname, "../templates.json");

fs.writeFileSync(
  outputPath,
  JSON.stringify(files, null, 2)
);

console.log(`Created files.json with ${files.length} files.`);
