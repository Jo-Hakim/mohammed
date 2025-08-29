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

const API_URL = "https://yousifhakim.pythonanywhere.com/articles"; // عدلها للـ PythonAnywhere link

async function fetchArticles() {
  const res = await fetch(API_URL);
  const data = await res.json();
  for (let i = 0; i < data.length; i++) {
    for (let a = 0; a < i.content.length; a++) {
      if (i.content[a] === "\n") {
        i.content[i] = "<br>";
      }
    }
  }
  document.getElementById("ul").innerHTML += data
    .map(
      (a) => `
      <hr>
    <li><h3>${a.title}</h3>
    <p>${a.content}</p></li>
  `
    )
    .join("");
  document.getElementById("ul").innerHTML += "<hr>";
}

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

fetchArticles();
