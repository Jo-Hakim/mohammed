function showContent(id) {
  // Hide all pages
  document
    .querySelectorAll(".page")
    .forEach((page) => (page.style.display = "none"));

  // Show the selected page
  document.getElementById(id).style.display = "block";

  // Remove active class from all links
  document
    .querySelectorAll("header ul li a")
    .forEach((link) => link.classList.remove("active"));

  // Add active class to the clicked link
  document
    .querySelector(`header ul li a[onclick="showContent('${id}')"]`)
    .classList.add("active");
}

// Optionally, show the default page on load
document.addEventListener("DOMContentLoaded", () => showContent("home"));

document.addEventListener("DOMContentLoaded", () => {
  const articleForm = document.getElementById("article-form");
  const titleInput = document.getElementById("article-title");
  const bodyInput = document.getElementById("article-body");
  const articlesDiv = document.getElementById("articles-list");

  articleForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const body = bodyInput.value;

    // Add article to the server
    await fetch("/add-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    // Add article to the DOM
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");
    articleDiv.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
    articlesDiv.appendChild(articleDiv);

    // Clear form
    titleInput.value = "";
    bodyInput.value = "";
  });
});
