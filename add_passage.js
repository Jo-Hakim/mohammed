document.addEventListener("DOMContentLoaded", () => {
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

const API_URL = "https://yousifhakim.pythonanywhere.com/api/articles/";

async function addArticle(title, content) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // redirect to homepage after success
    window.location.href = "index.html";
  } catch (err) {
    console.error("Failed to add article:", err);
    alert("Failed to add article. See console.");
  }
}
