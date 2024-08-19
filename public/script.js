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
  const form = document.getElementById("article-form");
  const articleList = document.getElementById("ul");

  // Function to fetch and display articles
  const fetchArticles = () => {
    fetch("/articles")
      .then((response) => response.json())
      .then((articles) => {
        articleList.innerHTML = ""; // Clear existing list
        articles.forEach((article) => {
          const li = document.createElement("li");
          li.innerHTML = `<h3>${article.title}</h3><p>${article.body}</p>`;
          articleList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching articles:", error));
  };

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("article-title").value;
    const body = document.getElementById("article-body").value;

    if (title && body) {
      fetch("/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          fetchArticles(); // Refresh the list of articles
          form.reset(); // Clear the form
        })
        .catch((error) => console.error("Error saving article:", error));
    }
  });

  // Fetch and display articles on page load
  fetchArticles();
});
