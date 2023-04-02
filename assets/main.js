const object = document.getElementById("object1");
const object2 = document.getElementById("object2");
const object3 = document.getElementById("object3");
const end1 = document.getElementById("end1");
const end2 = document.getElementById("end2");
const end3 = document.getElementById("end3");
const btns = document.querySelectorAll(".form_btn");
const modal = document.getElementById("modal");

document.addEventListener(
  "click",
  function (e) {
    const wrap = e.target.classList.contains("calc__modal__wrap");
    if (!wrap) return;
    closeModal();
  }.bind(this)
);

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      setInterval(animateDelivery, 4500);
      animateDelivery();
    }
  });
});

observer.observe(object);

const docWidth = document.documentElement.clientWidth;
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

checkBtns();

function animateDelivery() {
  setTimeout(firstPlane, 0);
  setTimeout(secondPlane, 2000);
  setTimeout(thirdPlane, 4000);
}

function setPosition() {
  track.style.transform = `translateX(${position}px)`;
}

function checkBtns() {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

function closeModal() {
  modal.classList.remove("calc__modal--active");
  modal.style.background = "none";
}

function openModal(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("form-name").value,
    phone: document.getElementById("form-tel").value,
    from: document.getElementById("form-from").value,
    to: document.getElementById("form-to").value,
    weight: document.getElementById("form-weight").value,
    volume: document.getElementById("form-volume").value,
  };

  document.getElementById("modal-tel").value = data.phone;
  document.getElementById("modal-from").innerHTML = data.from;
  document.getElementById("modal-to").innerHTML = data.to;
  document.getElementById("modal-weight").innerHTML = data.weight;
  document.getElementById("modal-volume").innerHTML = data.volume;

  // cost & distanse calculate

  modal.classList.add("calc__modal--active");
  modal.style.background = "rgba(0, 0, 0, 0.5)";
}

function firstPlane() {
  let speed = document.documentElement.clientWidth / 1000;
  let angle = (17 * Math.PI) / 180;
  let x = 0;
  let y = 0;

  const direction1 = setInterval(() => {
    let currentX = object.getBoundingClientRect().x;
    let currentY = object.getBoundingClientRect().y;

    x += speed * Math.cos(angle);
    y += speed * Math.sin(angle);
    object.style.transform = `translate(${x}px, ${y}px)`;

    if (currentY >= end1.y - speed * 6 && currentX >= end1.x - speed * 6) {
      clearInterval(direction1);
    }
  }, 1);
}

function secondPlane() {
  let speed = document.documentElement.clientWidth * 0.001005;
  let angle =
    (-(31 * Math.PI) / 180) * (document.documentElement.clientWidth / 1920);
  let x = 0;
  const maxHeight = document.documentElement.clientWidth * 0.0001;
  const coef = document.documentElement.clientWidth * 0.000297;
  let y = 0;
  let time = 0;
  let rotate = -20;
  const fly = () => {
    let currentX = object2.getBoundingClientRect().x;
    let currentY = object2.getBoundingClientRect().y;

    x += speed * Math.cos(angle);
    y = -(maxHeight * Math.sin(angle) - coef * 10 * time ** 2);
    object2.style.transform = `translate(${x}px, ${y}px) rotate(${
      rotate + time * 3
    }deg)`;

    if (currentY >= end2.y - speed * 7 && currentX >= end2.x - speed * 7) {
      clearInterval(flyInterval);
    }
    time += 0.01;
  };

  const flyInterval = setInterval(fly, 1);
}

function thirdPlane() {
  let speed = document.documentElement.clientWidth * 0.001005;
  let angle = (-45 * Math.PI) / 180;
  let x = 0;
  const maxHeight = document.documentElement.clientWidth * 0.00001;
  const coef = document.documentElement.clientWidth * 0.0001;
  let y = 0;
  let time = 0;
  let rotate = 20;
  let yCoef = document.documentElement.clientWidth * 0.006;

  const fly = () => {
    let currentX = object3.getBoundingClientRect().x;

    yCoef += document.documentElement.clientWidth * 0.00045;
    x += speed * Math.cos(angle);
    y = maxHeight * Math.sin(angle) - coef * time ** 2;

    object3.style.transform = `translate(${x}px, ${y + yCoef}px) rotate(${
      rotate - time * 5
    }deg)`;

    if (currentX >= end3.x - speed * 8) {
      clearInterval(flyInterval);
    }
    time += 0.02;
  };

  const flyInterval = setInterval(fly, 1);
}
