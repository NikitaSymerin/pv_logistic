const object = document.getElementById("object");

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setInterval(animateDelivery, 3000);
    }
  });
});

observer.observe(object);

const docWidth = document.documentElement.clientWidth;
console.log(docWidth);
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
const itemWidth = (container.clientWidth / slidesToShow) - 40;
const movePosition = slidesToScroll * (itemWidth + 40);

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener("click", () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * (itemWidth + 40)) / (itemWidth + 40);

  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

btnPrev.addEventListener("click", () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

checkBtns();

function animateDelivery() {
  observer.disconnect();
  const end = document.getElementById("end");
  const speed = document.documentElement.clientWidth / 1000;
  const angle = (17 * Math.PI) / 180;
  let x = 0;
  let y = 0;

  const animation = setInterval(() => {
    let currentX = object.getBoundingClientRect().x;
    let currentY = object.getBoundingClientRect().y;
    let endPos = end.getBoundingClientRect();

    x += speed * Math.cos(angle);
    y += speed * Math.sin(angle);
    object.style.transform = `translate(${x}px, ${y}px)`;

    if (currentY >= end.y && currentX >= end.x) {
      clearInterval(animation);
    }
  }, 1);
}

function setPosition() {
  track.style.transform = `translateX(${position}px)`;
}

function checkBtns() {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}