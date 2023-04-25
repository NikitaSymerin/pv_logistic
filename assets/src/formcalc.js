document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementsByName("shipment_type"),
    n = document.getElementsByName("groupage_option"),
    t = document.getElementById("groupage_options"),
    l = document.getElementById("dimensions"),
    i = document.getElementById("places_count"),
    o = document.createElement("label");
  (o.htmlFor = "places_count"), (o.innerText = "");
  const a = document.getElementById("dimensions_fields");
  function d() {
    const e = document.querySelector(
      'input[name="groupage_option"]:checked'
    ).value;
    let n = "",
      t = "";
    if (
      ("letter" === e ? ((n = "гр"), (t = "см")) : ((n = "кг"), (t = "м")),
      "multiple_places" === e)
    )
      l.insertBefore(o, a), (i.style.display = "inline");
    else {
      const e = l.querySelector('label[for="places_count"]');
      e && l.removeChild(e), (i.style.display = "none"), (i.value = 1);
    }
    const d = parseInt(i.value);
    a.innerHTML = "";
    for (let l = 1; l <= d; l++)
      a.innerHTML += `\n            ${
        "multiple_places" === e
          ? 1 === l
            ? "<p>Место 1:</p>"
            : `<p>Место ${l}:</p>`
          : ""
      }\n <input placeholder="Вес (${n})" class="input-item" type="number" name="weight_${l}" id="weight_${l}" step="0.01" required>\n<input class="input-item" placeholder="Длина (${t})" type="number" name="length_${l}" id="length_${l}" step="0.01" required>\n<input placeholder="Ширина (${t})" class="input-item" type="number" name="width_${l}" id="width_${l}" step="0.01" required>\n<input placeholder="Высота (${t})" class="input-item" type="number" name="height_${l}" id="height_${l}" step="0.01" required>\n            <br><br>\n        `;
  }
  e.forEach((e) => {
    e.addEventListener("change", () => {
      "groupage" === e.value
        ? (t.style.display = "block")
        : ((t.style.display = "none"),
          (l.style.display = "none"),
          n.forEach((e) => (e.checked = !1)));
    });
  }),
    n.forEach((e) => {
      e.addEventListener("change", () => {
        (l.style.display = "block"), d();
      });
    }),
    i.addEventListener("input", d);
});
