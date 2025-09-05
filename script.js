async function fetchArticles() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await res.json();
  data.forEach((article) => {
    article.content = article.content.replace(/\n/g, "<br>");
  });

  document.getElementById("ul").innerHTML += data
    .map((a) => `<li><h3>${a.title}</h3><p>${a.content}</p></li><hr>`)
    .join("");
}

function showContent(id) {
  const sections = document.querySelectorAll(".page");
  sections.forEach((section) => {
    section.style.display = section.id === id ? "block" : "none";
  });

  const links = document.querySelectorAll("nav ul li a");
  links.forEach((link) => {
    if (link.getAttribute("href") === "#" + id) {
      link.style.color = "gray";
    } else {
      link.style.color = "";
    }
  });
}

// Show the hero section by default
document.addEventListener("DOMContentLoaded", () => {
  showContent("home");
});

//adding articles
document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("submit-button-form");
  const articleList = document.getElementById("ul");
  const addButton = document.getElementById("submit-button");
  const articlesPage = document.getElementById("article");
  if (articlesPage) {
    await fetchArticles();
  }
  addButton.addEventListener("click", () => {
    window.location.assign("password.html");
  });
});
