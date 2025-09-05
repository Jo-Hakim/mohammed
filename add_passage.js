document.addEventListener("DOMContentLoaded", () => {
  const passageForm = document.getElementById("passage-form");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const addButton = document.getElementById("submitBtn");
  addButton.addEventListener("click", async function (e) {
    e.preventDefault();
    if (titleInput.value && contentInput.value) {
      await addArticle(titleInput.value, contentInput.value);
    }
  });
});

const API_URL = "https://yousifhakim.pythonanywhere.com/articles/";

async function addArticle(title, content) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else if (response.ok) {
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error("Failed to add article:", err);
    alert("Failed to add article. See console for details.");
  }
}
