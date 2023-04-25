const menu = document.getElementById("menu");
const docWidth = document.documentElement.clientWidth;

if (docWidth <= 640) {
  menu.classList.remove("d-none");
  document.getElementById("links").classList.add("d-none");
  document.getElementById("links2").classList.add("d-none");
  document.getElementById("ordercall").classList.add("d-none");
}

menu.addEventListener("click", () => {
  document.getElementById("menuPopup").classList.add("showMenu");
});

document.getElementById("close").addEventListener("click", () => {
  document.getElementById("menuPopup").classList.remove("showMenu");
});

switch (window.location.pathname) {
  case "/":
    document.getElementById("link1").classList.add("marked__link");
    break;
  case "/about":
    document.getElementById("link2").classList.add("marked__link");
    break;
  case "/about2":
    document.getElementById("link3").classList.add("marked__link");
    break;
}
