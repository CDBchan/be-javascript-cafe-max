// postDetail 댓글
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comment-list");
const countOfcomment = document.getElementById("count-of-comment");
var comment = 0;

setCountOfComment();

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const commentText = commentInput.value.trim();

  countOfcomment.textContent = "댓글 " + comment + "개";
  if (commentText) {
    // commentText 변수가 존재하며 빈 문자열이 아닐때
    const commentElement = document.createElement("div");
    commentElement.classList.add("posting-box");
    commentElement.id = "comment";
    commentElement.textContent = commentText;
    commentList.appendChild(commentElement);
    commentInput.value = "";
    addComment();
    setCountOfComment();
  }
});

function addComment() {
  comment++; // 댓글 개수를 1 증가시킴
}

function setCountOfComment() {
  countOfcomment.textContent = "댓글 " + comment + "개"; // 댓글 개수를 업데이트함
}

//postDetail 의 content 설정
var posts = [];
fetch("post.json")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    renderPosts(posts);
  })
  .catch((error) => {
    console.error(error);
  });

function renderPosts(posts) {
  const title = getUrlParameter("title"); // URL에서 title 매개 변수 값을 가져옴
  const post = posts.find((post) => post.title === title); // title이 일치하는 포스트를 찾음
  if (post) {
    renderPostContent(post.content); // 찾은 포스트의 내용을 표시
  } else {
    // 찾을 수 없는 포스트의 경우 에러 메시지를 표시
    const contentElement = document.getElementById("post-content");
    contentElement.innerText = "The requested post could not be found.";
  }
}

function renderPostContent(content) {
  const contentElement = document.getElementById("post-content");
  contentElement.innerText = content;
}

function getUrlParameter(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
