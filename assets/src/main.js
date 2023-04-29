const popup = document.getElementById("popup");
const btns = document.querySelectorAll(".form_btn");
const loader = document.getElementById("loader");
const loaderblock = document.querySelector(".loader__container");
const videoContainer = document.getElementById("video");
const video = document.getElementById("videoplay");
const isSub = document.getElementById("isSub");
const docHeight = document.documentElement.clientHeight;
const backBtn = document.getElementById("back");
const list = document.querySelector(".custom-list");
const main = document.querySelector(".main");
let timeVideo = 0;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

backBtn.addEventListener("click", () => {
  scrollToTop();
  backBtn.classList.remove("showBack");
})

document.addEventListener("scroll", checkScroll)

function checkScroll() {
  if (document.documentElement.scrollTop > docHeight) {
    backBtn.classList.add("showBack");
  } else {
    backBtn.classList.remove("showBack");
  }
}

if (video)
  video.addEventListener("loadedmetadata", function () {
    video.playbackRate = 1.8;
    timeVideo = video.duration / 1.6;
  });

window.addEventListener("load", function () {
  if (videoContainer) {
    video.play();
    setTimeout(() => {
      main.classList.remove("main__hidden");
      videoContainer.style.opacity = "0";
    }, timeVideo * 1000);
  }
  if (docWidth >= 470)
    if (popup)
      setTimeout(() => {
        popup.classList.add("showPopup");
      }, timeVideo * 1000);
  if (docWidth < 640) setTimeout(() => list.style.opacity = "1", timeVideo * 1000);
});
