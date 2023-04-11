const popup = document.getElementById("popup");
const btns = document.querySelectorAll(".form_btn");
const loader = document.getElementById("loader");
const loaderblock = document.querySelector(".loader__container");
const videoContainer = document.getElementById("video");
const video = document.getElementById("videoplay");
const isSub = document.getElementById("isSub");

let timeVideo = 0;

if (video)
  video.addEventListener("loadedmetadata", function () {
    timeVideo = video.duration;
  });

window.addEventListener("load", function () {
  loaderblock.classList.add("loader__container--hidden");
  setTimeout(() => {
    videoContainer.style.opacity = "0";
    videoContainer.style.zIndex = "-1";
  }, timeVideo * 1000 - 2000);
  if (docWidth >= 470)
    if (popup)
      setTimeout(() => {
        popup.classList.add("showPopup");
      }, timeVideo * 1000);
});
