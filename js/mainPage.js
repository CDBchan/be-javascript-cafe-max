// JSON 데이터 가져오기
var posts = [];
fetch("post.json")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    const textList = document.getElementById("mainPage-countOfText");
    textList.innerText = "전체 글 " + posts.length + "개";

    updatePagination(posts);
  })
  .catch((error) => {
    console.error(error);
  });

let currentPage = 1;
const postsPerPage = 10;

// html 작성후 삽입
function renderPosts(posts) {
  const textList = document.getElementById("mainPage-text-list");
  textList.innerHTML = "";

  posts.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("my-list-item");
    li.innerHTML = `
        <div id="my-list-item-title">
            <p class="title">${item.title}</p>
        </div>
        <div id="my-list-item-except-title">
            <p class="author">${item.author}</p>
            <p class="date">${item.date}</p>
            <p class="views">${item.views}</p>
        </div>
        `;
    const line = document.createElement("hr");
    textList.appendChild(li);
    textList.appendChild(line);
  });
}

// 버튼 동작

function getPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  return posts.slice(start, end);
}

function updatePagination() {
  const posts = getPosts();
  renderPosts(posts);
  renderPageNumbers();
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  updatePagination();
}

function renderPageNumbers() {
  const pageNumContainer = document.getElementById("page-numbers");
  pageNumContainer.innerHTML = "";

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageNumButton = document.createElement("button");
    pageNumButton.textContent = i;
    pageNumButton.onclick = function () {
      goToPage(i);
    };

    if (currentPage === i) {
      pageNumButton.disabled = true;
    }

    pageNumContainer.appendChild(pageNumButton);
  }
}

// 초기 게시글 렌더링
updatePagination();
