function line() {
  const line = document.querySelector(".conveer-line");
  const width = line.clientWidth;
  i = 0;
  while (i > -50) {
    line.style.transform = `translate3d(${i}%, 0px, 0px)`;
    i--;
  }
}

setInterval(line, 10000);
