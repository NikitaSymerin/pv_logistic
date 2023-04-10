const popup = document.getElementById("popup");
const object = document.getElementById("object1");
const object2 = document.getElementById("object2");
const object3 = document.getElementById("object3");
const end1 = document.getElementById("end1");
const end2 = document.getElementById("end2");
const end3 = document.getElementById("end3");
const btns = document.querySelectorAll(".form_btn");
const modal = document.getElementById("modal");
const modalWindow = document.querySelector(".calc__modal__window");
const loader = document.getElementById("loader");
const loaderblock = document.querySelector(".loader__container");
const successModal = document.querySelector(".success__modal__window");
const subPopup = document.querySelector(".sub__modal__window");
const videoContainer = document.getElementById("video");
const video = document.getElementById("videoplay");
const isSub = document.getElementById("isSub");
let timeVideo = 0;
const data = {
  name: "",
  phone: "",
  from: "",
  to: "",
  weight: "",
  volume: "",
  mail: "",
  cost: "",
  distance: "",
  comment: "",
};

document.addEventListener(
  "click",
  function (e) {
    const wrap = e.target.classList.contains("calc__modal__wrap");
    if (!wrap) return;
    closeModal();
  }.bind(this)
);

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

video.addEventListener("loadedmetadata", function () {
  timeVideo = video.duration;
});

window.addEventListener("load", function () {
  loaderblock.classList.add("loader__container--hidden");
  setTimeout(() => {
    videoContainer.style.opacity = "0";
    videoContainer.style.zIndex = "-1";
  }, timeVideo * 1000 - 2000);
  setTimeout(() => {
    popup.classList.add("showPopup");
  }, timeVideo * 1000);
});

checkBtns();

///
/// funcs
///

function setPosition() {
  track.style.transform = `translateX(${position}px)`;
}

function checkBtns() {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

function cancelSub() {
  popup.style.opacity = "0";
  popup.style.zIndex = "-1";
}

function acceptSub() {
  popup.style.opacity = "0";
  popup.style.zIndex = "-1";

  modalWindow.style.opacity = "0";
  modal.classList.add("calc__modal--active");
  modal.style.background = "rgba(0, 0, 0, 0.5)";
  subPopup.style.zIndex = "0";
  subPopup.style.opacity = "1";
}

function closeModal() {
  modal.classList.remove("calc__modal--active");
  successModal.style.zIndex = "-10000";
  successModal.style.opacity = "0";
  modal.style.background = "none";
}

async function openModal(event, dir) {
  event.preventDefault();

  data.name = document.getElementById(
    dir == 1 ? "form-name" : "form2-name"
  ).value;
  data.phone = document.getElementById(
    dir == 1 ? "form-tel" : "form2-tel"
  ).value;
  data.from = document.getElementById(
    dir == 1 ? "form-from" : "form2-from"
  ).value;
  data.to = document.getElementById(dir == 1 ? "form-to" : "form2-to").value;
  data.weight = document.getElementById(
    dir == 1 ? "form-weight" : "form2-weight"
  ).value;
  data.volume = document.getElementById(
    dir == 1 ? "form-volume" : "form2-volume"
  ).value;

  showLoader();
  try {
    [data.distance, data.cost] = await getData(data);
  } catch {
    hideLoader();
  }
  hideLoader();

  document.getElementById("modal-tel").value = data.phone;
  document.getElementById("modal-from").innerHTML = data.from;
  document.getElementById("modal-to").innerHTML = data.to;
  document.getElementById("modal-weight").innerHTML = data.weight;
  document.getElementById("modal-volume").innerHTML = data.volume;
  document.getElementById("modal-cost").innerHTML = data.cost;
  document.getElementById("modal-dist").innerHTML = data.distance;

  modalWindow.style.opacity = "1";
  modal.classList.add("calc__modal--active");
  modal.style.background = "rgba(0, 0, 0, 0.5)";
}

async function getData(data) {
  const key =
    "AuhLPv41yqdhHyrTczcWhRj1Ez4w64yryuGGaA7aMBu9X1hqpzjhsgaCKXzAw4b1";
  const urlLocation = "https://dev.virtualearth.net/REST/v1/Locations?q=";
  const urlDistance =
    "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=";
  const locationFrom = await fetch(
    urlLocation + encodeURIComponent(data.from) + "&key=" + key
  ).then((res) => res.json());
  const locationTo = await fetch(
    urlLocation + encodeURIComponent(data.to) + "&key=" + key
  ).then((res) => res.json());
  const fromXY =
    locationFrom.resourceSets[0].resources[0].geocodePoints[0].coordinates;
  const toXY =
    locationTo.resourceSets[0].resources[0].geocodePoints[0].coordinates;
  const distanceData = await fetch(
    urlDistance +
      key +
      "&origins=" +
      fromXY[0] +
      "," +
      fromXY[0] +
      "&destinations=" +
      toXY[0] +
      "," +
      toXY[0] +
      "&travelMode=driving"
  ).then((res) => res.json());

  const distance =
    distanceData.resourceSets[0].resources[0].results[0].travelDistance;
  const cost =
    parseInt(data.weight) * 100 + 10 * distance + parseInt(data.volume);

  return [Math.round(distance * 100) / 100, Math.round(cost * 100) / 100];
}

function showLoader() {
  loaderblock.classList.remove("loader__container--hidden");
}

function hideLoader() {
  loaderblock.classList.add("loader__container--hidden");
}

async function postSub() {
  data.name = document.getElementById("modal-sub-name").value;
  data.mail = document.getElementById("modal-sub-mail").value;
  try {
    await fetch("./postsub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        data: data,
      }),
    });
  } catch (e) {
    console.log("Ошибка: ", e);
  }
}

async function subscribe() {
  showLoader();
  await postSub();
  hideLoader();
  modalWindow.style.opacity = "0";
  subPopup.style.zIndex = "-1";
  subPopup.style.opacity = "0";
  closeModal();
}

async function sendMail(message) {
  const subscribed = isSub.checked;
  try {
    await fetch("./send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        subscribed: subscribed,
        message: message,
        data: data,
      }),
    });
  } catch (e) {
    console.log("Ошибка: ", e);
  }
}

function formMessage(data) {
  return `Заявка по доставке клиенту ${data.name} из г. ${data.from} в г. ${data.to}.\nВес груза: ${data.weight} кг\nОбъём груза: ${data.volume} м^3\nСтоимость: ${data.cost} руб.\nРасстояние: ${data.distance} км\nНомер телефона клиента: ${data.phone}\nКомментарий: ${data.comment}`;
}

async function orderCall() {
  data.mail = document.getElementById("modal-mail").value;
  data.comment = document.getElementById("modal-comment").value;
  showLoader();
  await sendMail(
    formMessage(data)
  );
  hideLoader();
  modalWindow.style.opacity = "0";
  successModal.style.zIndex = "0";
  successModal.style.opacity = "1";
}
