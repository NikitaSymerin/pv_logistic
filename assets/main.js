const object = document.getElementById("object");

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) animateDelivery();
  });
});

observer.observe(object);

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
