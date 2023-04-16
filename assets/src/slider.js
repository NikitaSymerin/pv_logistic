let position = 0;
let slidesToShow = 3;
let slidesToScroll = 3;

if (docWidth >= 640 && docWidth <= 1048) {
  slidesToScroll = 2;
  slidesToShow = 2;
}
if (docWidth < 640) {
  slidesToScroll = 1;
  slidesToShow = 1;
}
if (docWidth < 5000 && docWidth > 1048) {
  slidesToScroll = 3;
  slidesToShow = 3;
}

const container = document.querySelector(".slider__container");
const track = document.querySelector(".slider__track");
const btnPrev = document.querySelector(".btn__prev");
const btnNext = document.querySelector(".btn__next");
const items = document.querySelectorAll(".slider__item");
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow - 40;
const movePosition = slidesToScroll * (itemWidth + 40);

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener("click", () => {
  const itemsLeft =
    itemsCount -
    (Math.abs(position) + slidesToShow * (itemWidth + 40)) / (itemWidth + 40);

  position -=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

btnPrev.addEventListener("click", () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position +=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

function checkBtns() {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

function setPosition() {
  track.style.transform = `translateX(${position}px)`;
}

checkBtns();