async function fetchArticles() {
  const API_URL = "https://yousifhakim.pythonanywhere.com";
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
  const theList = document.getElementById("unordered-list").children;
  sections.forEach((section) => {
    section.style.display = section.id === id ? "block" : "none";
  });

  Array.from(theList).forEach((anchor) => {
    Array.from(anchor.children)[0].style.backgroundColor =
      Array.from(theList).indexOf(anchor) ===
      Array.from(sections).indexOf(
        Array.from(sections).filter(
          (section) => section.style.display == "block"
        )[0]
      )
        ? "red"
        : "white";
    Array.from(anchor.children)[0].style.color =
      Array.from(theList).indexOf(anchor) ===
      Array.from(sections).indexOf(
        Array.from(sections).filter(
          (section) => section.style.display == "block"
        )[0]
      )
        ? "white"
        : "black";
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

const btn = document.querySelectorAll(".scrollBtn");
btn.forEach((button) => {
  button.addEventListener("click", function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
});
