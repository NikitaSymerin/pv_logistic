const flag = document.getElementById("weightitem");

function showFields() {
  let cargo = document.querySelector('input[name="cargo"]:checked').value;
  let container = document.querySelector("#container");
  container.innerHTML = "";
  if (cargo === "single") {
    flag.style.display = "block"
    let inputWeight = createInput("text", "weight", "Вес груза (кг)");
    let inputLength = createInput("text", "length", "Длина (м)");
    let inputWidth = createInput("text", "width", "Ширина (м)");
    let inputHeight = createInput("text", "height", "Высота (м)");
    container.appendChild(inputWeight);
    container.appendChild(inputLength);
    container.appendChild(inputWidth);
    container.appendChild(inputHeight);
  } else if (cargo === "multiple") {
    let numFields = parseInt(prompt("Введите количество мест:"));
    if (isNaN(numFields) || numFields < 1) {
      document.querySelector(
        'input[name="cargo"][value="single"]'
      ).checked = true;
      showFields();
      return;
    }
    flag.style.display = "block"
    for (let i = 1; i <= numFields; i++) {
      let header = document.createElement("h3");
      header.textContent = `Место ${i}`;
      let inputWeight = createInput("text", `weight${i}`, "Вес груза (кг)");
      let inputLength = createInput("text", `length${i}`, "Длина (м)");
      let inputWidth = createInput("text", `width${i}`, "Ширина (м)");
      let inputHeight = createInput("text", `height${i}`, "Высота (м)");
      container.appendChild(header);
      container.appendChild(inputWeight);
      container.appendChild(inputLength);
      container.appendChild(inputWidth);
      container.appendChild(inputHeight);
    }
  } else if (cargo === "letter") {
    flag.style.display = "block"
    let inputWeight = createInput("text", "weight", "Вес груза (гр)");
    let inputLength = createInput("text", "length", "Длина (см)");
    let inputWidth = createInput("text", "width", "Ширина (см)");
    let inputHeight = createInput("text", "height", "Высота (см)");
    container.appendChild(inputWeight);
    container.appendChild(inputLength);
    container.appendChild(inputWidth);
    container.appendChild(inputHeight);
  }

  document.querySelectorAll('input[name="cargo"]').forEach((input) => {
    document.querySelector(
      'input[name="transport"][value="sbor"]'
    ).checked = true;
    input.addEventListener("change", function () {
      // Если выбран переключатель "Выделенный транспорт" или "Контейнер", снимаем переключатели группы "Состав груза"
      if (
        document.querySelector('input[name="transport"][value="vt"]').checked ||
        document.querySelector('input[name="transport"][value="kont"]').checked
      ) {
        document
          .querySelectorAll('input[name="cargo"]')
          .forEach((otherInput) => {
            otherInput.checked = false;
          });
      } else {
        document
          .querySelectorAll('input[name="cargo"]')
          .forEach((otherInput) => {
            otherInput.disabled = false;
          });
      }
      // Устанавливаем переключатель на Сборный груз
      document.querySelector(
        'input[name="transport"][value="sbor"]'
      ).checked = true;
    });
  });

  document.querySelectorAll('input[name="transport"]').forEach((input) => {
    input.addEventListener("change", function () {
      // Если выбран переключатель "Выделенный транспорт" или "Контейнер", снимаем переключатели группы "Состав груза"
      if (input.checked) {
        document
          .querySelectorAll('input[name="cargo"]')
          .forEach((otherInput) => {
            otherInput.checked = false;
          });
      }
    });
  });
}

function createInput(type, name, label) {
  let input = document.createElement("input");
  input.classList.add("input-item");
  input.style.display = "block";
  input.type = type;
  input.name = name;
  input.placeholder = label;
  let inputLabel = document.createElement("label");
  inputLabel.appendChild(input);
  return inputLabel;
}

document.querySelectorAll('input[name="cargo"]').forEach((input) => {
  input.addEventListener("change", showFields);
});
