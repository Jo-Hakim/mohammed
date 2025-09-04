document.addEventListener("DOMContentLoaded", () => {
  const passageForm = document.getElementById("passage-form");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const addButton = document.getElementById("submitBtn");
  addButton.addEventListener("click", () => {
    if (titleInput.value && contentInput.value) {
      addArticle();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchArticles();
});

const API_URL = "https://yousifhakim.pythonanywhere.com/articles/";

async function addArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  fetchArticles(); // refresh
}
