const videos = document.querySelectorAll(".video");
const captions = document.querySelectorAll(".caption");
let currentIndex = 0;

function playNextVideo() {
  videos.forEach((video, index) => {
    video.pause();
    video.currentTime = 0;
    video.classList.remove("zoom");
    captions[index].style.display = "none";
  });

  videos[currentIndex].play();
  videos[currentIndex].classList.add("zoom");
  captions[currentIndex].style.display = "block";

  currentIndex++;
  if (currentIndex >= videos.length) {
    currentIndex = 0;
  }
}

videos.forEach((video, index) => {
  video.addEventListener("loadeddata", () => {
    if (video.readyState >= 3) {
      video.muted = true;
      video.loop = false;
    }
  });

  video.addEventListener("ended", () => {
    video.classList.remove("zoom");
    setTimeout(() => {
      if (index === currentIndex - 1 || (currentIndex === 0 && index === videos.length - 1)) {
        playNextVideo();
      }
    }, 1000);
  });
});

playNextVideo();
