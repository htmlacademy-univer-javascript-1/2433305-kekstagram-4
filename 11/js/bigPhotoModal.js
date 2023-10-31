const commentTemplate = document.querySelector(".social__comment");

const downloadMoreButton = document.querySelector(".social__comments-loader");

const commentsLoader = document.querySelector(".comments-loader");

const onDocumentKeydown = (evt) => {
  if (evt.key === "Escape") {
    closePicture(evt);
  }
};

downloadMoreButton.addEventListener("click", function (evt) {
  download5Photos();
});

const download5Photos = () => {
  let currentComment = document.querySelector(".social__comment.hidden");
  let i = 0;
  for (; i < 5; i++) {
    if (currentComment === null) {
      commentsLoader.classList.add("hidden");
      break;
    }
    currentComment.classList.remove("hidden");
    currentComment = currentComment.nextElementSibling;
  }
  document.querySelector(".active__comments-count").textContent =
    +document.querySelector(".active__comments-count").textContent + i;
};

function openPicture(evt, url, description, likes, comments) {
  document.querySelector(".active__comments-count").textContent = 5;
  if (comments.length == 0) {
    document.querySelector(".active__comments-count").textContent = 0;
  }
  const openedPicture = document.querySelector(".big-picture");
  commentsLoader.classList.remove("hidden");
  openedPicture.classList.remove("hidden");
  openedPicture.querySelector(".big-picture__img img").src = url;
  openedPicture.querySelector(".likes-count").textContent = likes;
  openedPicture.querySelector(".comments-count").textContent = comments.length;
  openedPicture.querySelector(".social__caption").textContent = description;

  const commentsFragment = document.createDocumentFragment();
  if (comments.length >= 5) {
    for (let i = 0; i < 5; ++i) {
      const comment = commentTemplate.cloneNode(true);
      comment.querySelector(".social__picture").src = comments[i].avatar;
      comment.querySelector(".social__picture").alt = comments[i].name;
      comment.querySelector(".social__text").textContent = comments[i].message;
      commentsFragment.append(comment);
    }

    for (let i = 5; i < comments.length; ++i) {
      const comment = commentTemplate.cloneNode(true);
      comment.querySelector(".social__picture").src = comments[i].avatar;
      comment.querySelector(".social__picture").alt = comments[i].name;
      comment.querySelector(".social__text").textContent = comments[i].message;
      comment.classList.add("hidden");
      commentsFragment.append(comment);
    }
  } else {
    for (let i = 0; i < comments.length; i++) {
      document.querySelector(".active__comments-count").textContent =
        comments.length;
      commentsLoader.classList.add("hidden");
      const comment = commentTemplate.cloneNode(true);
      comment.querySelector(".social__picture").src = comments[i].avatar;
      comment.querySelector(".social__picture").alt = comments[i].name;
      comment.querySelector(".social__text").textContent = comments[i].message;
      commentsFragment.append(comment);
    }
  }

  const commentsContainer = document.querySelector(".social__comments");
  commentsContainer.innerHTML = "";
  commentsContainer.append(commentsFragment);

  document.body.classList.add("modal-open");

  openedPicture
    .querySelector(".big-picture__cancel")
    .addEventListener("click", closePicture);
  document.addEventListener("keydown", onDocumentKeydown);
}

function closePicture(evt) {
  document.body.classList.remove("modal-open");
  document.querySelector(".big-picture").classList.add("hidden");
  evt.target.removeEventListener("click", closePicture);
  document.removeEventListener("keydown", onDocumentKeydown);
}

export { openPicture };
