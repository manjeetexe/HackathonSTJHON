// server/index.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the Vite React app's build folder
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});