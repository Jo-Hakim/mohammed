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
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submit-button-form");
  const articleList = document.getElementById("ul");
  const addButton = document.getElementById("submit-button");
  addButton.addEventListener("click", () => {
    window.location.assign("password.html");
  });
});
