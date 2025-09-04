async function fetchArticles() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
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
  fetchArticles();
});

//adding articles
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submit-button-form");
  const articleList = document.getElementById("ul");
  const addButton = document.getElementById("submit-button");
  addButton.addEventListener("click", () => {
    window.location.assign("password.html");
  });
});
