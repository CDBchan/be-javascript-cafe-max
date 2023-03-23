const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comment-list");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const commentText = commentInput.value.trim();

  if (commentText) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = commentText;
    commentList.appendChild(commentElement);
    commentInput.value = "";
  }
});
