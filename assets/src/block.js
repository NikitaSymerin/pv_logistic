document.onkeypress = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};
document.onmousedown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};

jQuery(document).ready(function ($) {
  $(document).keydown(function (event) {
    var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

    if (event.ctrlKey && (pressedKey == "c" || pressedKey == "u")) {
      return false;
    }
  });
});

document.addEventListener(
  "keydown",
  function (e) {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.shiftKey &&
      e.keyCode === 73
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.keyCode === 83) {
    event.preventDefault();
  }
});
