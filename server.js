const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the same directory as server.js
app.use(express.static(__dirname));

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hakim.html"));
});

// Path for articles JSON file
const articlesFile = path.join(__dirname, "articles.json");

// Get all articles
app.get("/articles", (req, res) => {
  fs.readFile(articlesFile, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading articles.");
    }

    const articles = JSON.parse(data || "[]");
    res.json(articles);
  });
});

// Add a new article
app.post("/add-article", (req, res) => {
  const newArticle = req.body;

  fs.readFile(articlesFile, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading articles.");
    }

    const articles = JSON.parse(data || "[]");
    articles.push(newArticle);

    fs.writeFile(articlesFile, JSON.stringify(articles, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving article.");
      }

      res.json({ success: true });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
