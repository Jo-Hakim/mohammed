const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Load articles from a JSON file
function loadArticles() {
    try {
        return JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
    } catch (error) {
        return [];
    }
}

// Save articles to a JSON file
function saveArticles(articles) {
    fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
}

// Endpoint to get articles
app.get('/articles', (req, res) => {
    const articles = loadArticles();
    res.json(articles);
});

// Endpoint to add a new article
app.post('/articles', (req, res) => {
    const articles = loadArticles();
    const newArticle = {
        title: req.body.title,
        body: req.body.body,
    };
    articles.push(newArticle);
    saveArticles(articles);
    res.json(newArticle);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
