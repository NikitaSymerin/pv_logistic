
document.querySelectorAll('input[name="cargo"]').forEach((input) => {
  input.addEventListener("change", showFields);
});

function showFields() {
  let e = document.querySelector('input[name="cargo"]:checked').value,
    t = document.querySelector("#container");
  if (((t.innerHTML = ""), "single" === e)) {
    let e = document.createElement("h5");
    (e.textContent = "Габариты груза:"), t.appendChild(e);
    let n = createInput("text", "weight", "Вес груза (кг)"),
      c = createInput("text", "length", "Длина (м)"),
      a = createInput("text", "width", "Ширина (м)"),
      r = createInput("text", "height", "Высота (м)");
    t.appendChild(n), t.appendChild(c), t.appendChild(a), t.appendChild(r);
  } else if ("multiple" === e) {
    let e = parseInt(prompt("Введите количество мест:"));
    if (isNaN(e) || e < 1)
      return (
        (document.querySelector('input[name="cargo"][value="single"]').checked =
          !0),
        void showFields()
      );
    for (let n = 1; n <= e; n++) {
      let e = document.createElement("h5");
      (e.textContent = "Габариты груза:"), t.appendChild(e);
      let c = document.createElement("h3");
      c.textContent = `Место ${n}`;
      let a = createInput("text", `weight${n}`, "Вес груза (кг)"),
        r = createInput("text", `length${n}`, "Длина (м)"),
        l = createInput("text", `width${n}`, "Ширина (м)"),
        d = createInput("text", `height${n}`, "Высота (м)");
      t.appendChild(c),
        t.appendChild(a),
        t.appendChild(r),
        t.appendChild(l),
        t.appendChild(d);
    }
  } else if ("letter" === e) {
    let e = document.createElement("h5");
    (e.textContent = "Габариты груза:"), t.appendChild(e);
    let n = createInput("text", "weight", "Вес груза (гр)"),
      c = createInput("text", "length", "Длина (см)"),
      a = createInput("text", "width", "Ширина (см)"),
      r = createInput("text", "height", "Высота (см)");
    t.appendChild(n), t.appendChild(c), t.appendChild(a), t.appendChild(r);
  }
  document.querySelectorAll('input[name="cargo"]').forEach((e) => {
    (document.querySelector('input[name="transport"][value="sbor"]').checked =
      !0),
      e.addEventListener("change", function () {
        document.querySelector('input[name="transport"][value="vt"]').checked ||
        document.querySelector('input[name="transport"][value="kont"]').checked
          ? document.querySelectorAll('input[name="cargo"]').forEach((e) => {
              e.checked = !1;
            })
          : document.querySelectorAll('input[name="cargo"]').forEach((e) => {
              e.disabled = !1;
            }),
          (document.querySelector(
            'input[name="transport"][value="sbor"]'
          ).checked = !0);
      });
  }),
    document.querySelectorAll('input[name="transport"]').forEach((e) => {
      e.addEventListener("change", function () {
        e.checked &&
          document.querySelectorAll('input[name="cargo"]').forEach((e) => {
            e.checked = !1;
          });
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