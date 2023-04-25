document.querySelectorAll('input[name="cargo"]').forEach((input) => {
  input.addEventListener("change", showFields);
});

function calculate(event) {
  event.preventDefault();
  let e = document.querySelector('input[name="shipment_type"]:checked');
  if (!e) return void swal("Пожалуйста, выберите тип доставки", "", "error");
  function t() {
    return (
      (document.querySelector('input[name="palletBoard"]:checked') ? 1e3 : 0) +
      (document.querySelector('input[name="palletBoardAmortization"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="woodenCrate"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="woodenCrateAmortization"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="hardBox"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="bags"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="additionalPackaging"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="bubbleWrap"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="cardboardBoxes"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="autoGlassPackaging"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="autoPartsPackaging"]:checked')
        ? 500
        : 0) +
      (document.querySelector('input[name="sendDocs"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="returnDocs"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="pickupFrom"]:checked') ? 0 : 500) +
      (document.querySelector('input[name="deliveryFrom"]:checked') ? 500 : 0) +
      (document.querySelector('input[name="pickupTo"]:checked') ? 0 : 500) +
      (document.querySelector('input[name="deliveryTo"]:checked') ? 500 : 0)
    );
  }
  let n = e.value,
    u = 0,
    o = document.querySelector('input[name="groupage_option"]:checked'),
    r = o ? o.value : null,
    c = document.querySelector('input[name="from"]').value;
  if ("" === c)
    return void swal(
      'Пожалуйста, введите значение в поле "Откуда"',
      "",
      "error"
    );
  let a = document.querySelector('input[name="to"]').value;
  if ("" === a)
    return void swal('Пожалуйста, введите значение в поле "Куда"', "", "error");
  let l = document.querySelector("#calc");
  if ("multiple_places" === r) {
    let e = parseInt(document.querySelector("#places_count").value);
    if (isNaN(e) || e <= 0)
      return void swal(
        'Пожалуйста, введите значение в поле "Количество мест"',
        "",
        "error"
      );
    let n = 0,
      u = 0;
    for (let o = 1; o <= e; o++) {
      let r = {
          weight: parseFloat(
            document.querySelector(`input[name="weight_${o}"]`).value
          ),
          length: parseFloat(
            document.querySelector(`input[name="length_${o}"]`).value
          ),
          width: parseFloat(
            document.querySelector(`input[name="width_${o}"]`).value
          ),
          height: parseFloat(
            document.querySelector(`input[name="height_${o}"]`).value
          ),
        },
        i = r.weight,
        d = r.length,
        s = r.width,
        m = r.height,
        p = d * s * m;
      if (isNaN(i) || isNaN(d) || isNaN(s) || isNaN(m))
        return void swal(
          "Пожалуйста, введите значение Габаритов и Веса груза",
          "",
          "error"
        );
      let h = 0;
      0 == p
        ? (h = 0)
        : p < 0.1
        ? (h = 1e3)
        : p >= 0.1 && p < 1
        ? (h = 800)
        : p >= 1 && p < 5
        ? (h = 500)
        : p >= 5 && p < 10
        ? (h = 400)
        : p >= 10 && p < 50
        ? (h = 300)
        : p >= 50 && (h = 250);
      let y = h * p * i;
      ymaps.route([c, a], { routingMode: "auto" }).then(
        function (o) {
          let r = o.getLength() / 1e3;
          if (((n += y + 10 * r), u++, (n += t()), u === e)) {
            document.querySelector("#result");
            swal({
              title: "Стоимость доставки",
              text: `${n.toFixed(2)} руб.`,
              icon: "success",
            })
          }
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    }
  } else {
    if ("groupage" === n && !o)
      return void swal('Пожалуйста, выберите "Состав груза"', "", "error");
    if ("dedicated_transport" === n)
      ymaps.route([c, a], { routingMode: "auto" }).then(
        function (e) {
          (distance = e.getLength() / 1e3), (u = 1e3 + t() + 10 * distance);
          document.querySelector("#result");
          swal({
            title: "Стоимость доставки",
            text: `${u.toFixed(2)} руб.`,
            icon: "success",
          });
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    else if ("container" === n)
      ymaps.route([c, a], { routingMode: "auto" }).then(
        function (e) {
          (distance = e.getLength() / 1e3), (u = 2e3 + t() + 10 * distance);
          document.querySelector("#result");
          swal({
            title: "Стоимость доставки",
            text: `${u.toFixed(2)} руб.`,
            icon: "success",
          });
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    else if ("one_place" === r) {
      let e = parseFloat(
          document.querySelector('input[name="weight_1"]').value
        ),
        n = parseFloat(document.querySelector('input[name="length_1"]').value),
        u = parseFloat(document.querySelector('input[name="width_1"]').value),
        o = parseFloat(document.querySelector('input[name="height_1"]').value);
      if (isNaN(e) || isNaN(n) || isNaN(u) || isNaN(o))
        return void swal(
          "Пожалуйста, введите значение Габаритов и Веса груза",
          "",
          "error"
        );
      let r = n * u * o,
        l = 0;
      0 == r
        ? (l = 0)
        : r < 0.1
        ? (l = 1e3)
        : r >= 0.1 && r < 1
        ? (l = 800)
        : r >= 1 && r < 5
        ? (l = 500)
        : r >= 5 && r < 10
        ? (l = 400)
        : r >= 10 && r < 50
        ? (l = 300)
        : r >= 50 && (l = 250);
      let i = l * r * e;
      ymaps.route([c, a], { routingMode: "auto" }).then(
        function (e) {
          let n = e.getLength() / 1e3,
            u = i + t() + 10 * n;
          document.querySelector("#result");
          swal({
            title: "Стоимость доставки",
            text: `${u.toFixed(2)} руб.`,
            icon: "success",
          });
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    } else if ("letter" === r) {
      let e = parseFloat(
          document.querySelector('input[name="weight_1"]').value
        ),
        n = parseFloat(document.querySelector('input[name="length_1"]').value),
        u = parseFloat(document.querySelector('input[name="width_1"]').value),
        o = parseFloat(document.querySelector('input[name="height_1"]').value);
      if (isNaN(e) || isNaN(n) || isNaN(u) || isNaN(o))
        return void swal(
          "Пожалуйста, введите значение Габаритов и Веса груза",
          "",
          "error"
        );
      let r = 0;
      r =
        e <= 0.1
          ? 200
          : e > 0.1 && e <= 0.5
          ? 250
          : e > 0.5 && e <= 1
          ? 300
          : 400;
      let l = r * e;
      ymaps.route([c, a], { routingMode: "auto" }).then(
        function (e) {
          let n = e.getLength() / 1e3,
            u = l + t() + 10 * n;
          document.querySelector("#result");
          swal({
            title: "Стоимость доставки",
            text: `${u.toFixed(2)} руб.`,
            icon: "success",
          });
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    }
  }
}