const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware to handle JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like hakim.html and script.js)
app.use(express.static("public"));

// Endpoint to get the list of articles
app.get("/articles", (req, res) => {
  fs.readFile("articles.json", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read articles" });
    }
    const articles = JSON.parse(data);
    res.json(articles);
  });
});

// Endpoint to save a new article
app.post("/articles", (req, res) => {
  const { title, body } = req.body;

  // Load existing articles
  fs.readFile("articles.json", (err, data) => {
    let articles = [];
    if (!err) {
      articles = JSON.parse(data);
    }

    // Add the new article
    articles.push({ title, body });

    // Save the updated articles list
    fs.writeFile("articles.json", JSON.stringify(articles), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save article" });
      }
      res.status(201).json({ message: "Article saved successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
