document.addEventListener("DOMContentLoaded", () => {
  const articleForm = document.getElementById("article-form");
  const titleInput = document.getElementById("article-title");
  const bodyInput = document.getElementById("article-body");
  const articlesDiv = document.getElementById("articles-list");

  // Handle form submission
  articleForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const body = bodyInput.value;

    // Send article data to the server
    await fetch("/add-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    // Create and append article to the DOM
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");
    articleDiv.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
    articlesDiv.appendChild(articleDiv);

    // Clear form
    titleInput.value = "";
    bodyInput.value = "";
  });

  // Optionally, you can fetch and display existing articles on load
  async function loadArticles() {
    const response = await fetch("/articles");
    const articles = await response.json();

    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article");
      articleDiv.innerHTML = `<h3>${article.title}</h3><p>${article.body}</p>`;
      articlesDiv.appendChild(articleDiv);
    });
  }

  loadArticles();
});
