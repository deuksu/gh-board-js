let posts = JSON.parse(localStorage.getItem("posts")) || [];

const savePosts = () => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

const addPost = () => {
  const textarea = document.querySelector("#postContent");
  const content = textarea.value.trim();
  if (!content) {
    return;
  }

  const newPost = {
    id: Date.now(),
    //content: content,
    content,
    createdAt: new Date().toLocaleString(),
    comments: [],
  };

  posts = [newPost, ...posts];

  savePosts();
  reanderPosts();

  textarea.value = "";
};

const renderPost = () => {
  const postList = document.querySelector("#postList");
  postList.innerHTML = "";

  posts.forEach(({ id, content, createdAt, comments }) => {
    const postEl = document.createElement("div");
    postEl.className = "post";

    const commentsHtml = comments
      .map((comm) => {
        return `<div>- ${comm.text}<small>${comm.createdAt}</small></div>`;
      })
      .join("");

    postEl.innerHTML = `
        <div>${content}</div>
        <div class="post-meta">${createdAt}</div>
        <button onclick="deletePost(${id})">삭제</button>
        <div class="comments">
          <strong>댓글</strong>
          ${commentsHtml}
          <input
            type="text"
            placeholder="댓글 입력"
            onkeypress="if(event.key == 'Enter') { addComment(${id}, this.value); this.value = '';}"
          />
        </div>      
      `;
    postList.appendChild(postEl);
  });
};

const deletePost = (id) => {
  posts = posts.filters((p) => id != p.id);
  savePosts();
  renderPost();
};
const addComment = (postId, commentText) => {
  posts = posts.map((p) => {
    postId == p.id
      ? {
          ...p,
          comments: [
            ...p.comments,
            { text: commentText, createdAt: new Date().toLocaleString() },
          ],
        }
      : p;
  });

  savePosts();
  reanderPosts();
};

renderPost();
