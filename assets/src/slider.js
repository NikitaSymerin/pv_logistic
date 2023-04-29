// reviews

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

const containerSlider = document.querySelector(".slider__container");
const track = document.querySelector(".slider__track");
const btnPrev = document.querySelector(".btn__prev");
const btnNext = document.querySelector(".btn__next");
const items = document.querySelectorAll(".slider__item");
const itemsCount = items.length;
const itemWidth = containerSlider.clientWidth / slidesToShow - 40;
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

//prices

let position2 = 0;
let slidesToShow2 = 1;
let slidesToScroll2 = 1;

const containerSlider2 = document.querySelector(".slider__container2");
const track2 = document.querySelector(".slider__track2");
const btnPrev2 = document.querySelector(".btn__prev2");
const btnNext2 = document.querySelector(".btn__next2");
const items2 = document.querySelectorAll(".slider__item2");
const heights = [];
document
  .querySelectorAll(".img__slide")
  .forEach((e) => heights.push(e.clientHeight));
console.log(heights);
const itemsCount2 = items2.length;
const itemWidth2 = containerSlider2.clientWidth / slidesToShow2;
const movePosition2 = slidesToScroll2 * itemWidth2;
const titleSlide = document.getElementById("title__slide");
const swiperEl = document.querySelector("swiper-container");
const slideImgs = document.getElementById("slide__part");
const pag = document.getElementById("pag");
const urls = [
  ["yamarket"],
  ["ozon", "wb"],
  ["ozon", "wb"],
  [],
  ["wb"],
  ["wb"],
  ["wb"],
  ["wb"],
  ["ozon"],
];
let i = 0;
const titles = [
  "Склады в Томлино и Софьино. Доставка по вторникам",
  "Складские услуги для маркетплейсов",
  "Складские услуги для маркетплейсов",
  "Отдельная машина (1-10 палет)",
  "Электросталь",
  "Москва-Санкт-Петербург",
  "Коледино, Подольск",
  "Москва-Казань",
  "Среда, суббота",
];

items2.forEach((item) => {
  item.style.minWidth = `${itemWidth2}px`;
});

btnNext2.addEventListener("click", () => {
  swiperEl.swiper.slideNext();
  console.log(position2, i);
});

btnPrev2.addEventListener("click", () => {
  swiperEl.swiper.slidePrev();
});

function next() {
  const itemsLeft2 =
    itemsCount2 -
    (Math.abs(position2) + slidesToShow2 * itemWidth2) / itemWidth2;

  position2 -=
    itemsLeft2 >= slidesToScroll2 ? movePosition2 : itemsLeft2 * itemWidth2;

  i += itemsLeft2 >= slidesToScroll2 ? 1 : 0;

  setPosition2();
  checkBtns2();
}

function prev() {
  const itemsLeft2 = Math.abs(position2) / itemWidth2;

  position2 +=
    itemsLeft2 >= slidesToScroll2 ? movePosition2 : itemsLeft2 * itemWidth2;

  i -= itemsLeft2 >= slidesToScroll2 ? 1 : 0;

  setPosition2();
  checkBtns2();
}

function checkBtns2() {
  btnPrev2.disabled = position2 === 0;
  btnNext2.disabled = position2 <= -(itemsCount2 - slidesToShow2) * itemWidth2;
}

swiperEl.addEventListener("slidechange", (event) => {
  console.log(event.detail[0]);
  if (event.detail[0].activeIndex > i) next();
  else prev();
});

function setPosition2() {
  titleSlide.textContent = titles[i];
  track2.style.height = `${heights[i] + 50}px`;
  slideImgs.innerHTML = "";
  newImg(urls[i]);
  pag.textContent = i + 1;
}

checkBtns2();
setPosition2();

function newImg(urls) {
  if (urls)
    urls.forEach((url) => {
      let img = new Image();
      img.src = "img/" + url + ".png";
      img.style.height = docWidth > 640 ? "100px" : "auto";
      if (docWidth < 640) {
        img.style.width = "120px";
        img.style.paddingBottom = "10px";
      }
      else img.style.paddingLeft = "10px";
      slideImgs.appendChild(img);
    });
}
