function calculate() {
  let e = document.querySelector('input[name="transport"]:checked').value,
    t = 0,
    n = document.querySelector('input[name="cargo"]:checked'),
    u = n ? n.value : null,
    o = [],
    r = document.querySelector('input[name="from"]').value,
    l = document.querySelector('input[name="to"]').value;
  if (
    ("vt" === e
      ? ymaps.route([r, l], { routingMode: "auto" }).then(
          function (e) {
            (distance = e.getLength() / 1e3),
              (t = 1e3 + 10 * distance),
              (document.querySelector("#result").innerHTML =
                "Стоимость доставки: " + t.toFixed(2) + " руб.");
          },
          function (e) {
            alert("Возникла ошибка: " + e.message);
          }
        )
      : "kont" === e &&
        ymaps.route([r, l], { routingMode: "auto" }).then(
          function (e) {
            (distance = e.getLength() / 1e3),
              (t = 2e3 + 10 * distance),
              (document.querySelector("#result").innerHTML =
                "Стоимость доставки: " + t.toFixed(2) + " руб.");
          },
          function (e) {
            alert("Возникла ошибка: " + e.message);
          }
        ),
    "vt" === e)
  )
    ymaps.route([r, l], { routingMode: "auto" }).then(
      function (e) {
        (distance = e.getLength() / 1e3),
          (t = 1e3 + 10 * distance),
          (document.querySelector("#result").innerHTML =
            "Стоимость доставки: " + t.toFixed(2) + " руб.");
      },
      function (e) {
        alert("Возникла ошибка: " + e.message);
      }
    );
  else if ("kont" === e)
    ymaps.route([r, l], { routingMode: "auto" }).then(
      function (e) {
        (distance = e.getLength() / 1e3),
          (t = 2e3 + 10 * distance),
          (document.querySelector("#result").innerHTML =
            "Стоимость доставки: " + t.toFixed(2) + " руб.");
      },
      function (e) {
        alert("Возникла ошибка: " + e.message);
      }
    );
  else if ("single" === u) {
    !(function () {
      let e = {
          weight: parseFloat(
            document.querySelector('input[name="weight"]').value
          ),
          length: parseFloat(
            document.querySelector('input[name="length"]').value
          ),
          width: parseFloat(
            document.querySelector('input[name="width"]').value
          ),
          height: parseFloat(
            document.querySelector('input[name="height"]').value
          ),
        },
        t = e.length * e.width * e.height,
        n = 0;
      0 == t
        ? (n = 0)
        : t < 0.1
        ? (n = 1e3)
        : t >= 0.1 && t < 1
        ? (n = 800)
        : t >= 1 && t < 5
        ? (n = 500)
        : t >= 5 && t < 10
        ? (n = 400)
        : t >= 10 && t < 50
        ? (n = 300)
        : t >= 50 && (n = 250);
      let u = n * t * e.weight;
      ymaps.route([r, l], { routingMode: "auto" }).then(
        function (e) {
          let t = e.getLength() / 1e3,
            n = u + 10 * t;
          document.querySelector("#result").innerHTML =
            "Стоимость доставки: " + n.toFixed(2) + " руб.";
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    })();
  } else if ("letter" === u) {
    !(function () {
      let e = {
          weight:
            parseFloat(document.querySelector('input[name="weight"]').value) /
            1e3,
          length:
            parseFloat(document.querySelector('input[name="length"]').value) /
            100,
          width:
            parseFloat(document.querySelector('input[name="width"]').value) /
            100,
          height:
            parseFloat(document.querySelector('input[name="height"]').value) /
            100,
        },
        t = e.length * e.width * e.height,
        n = 0;
      0 == t
        ? (n = 0)
        : t < 0.1
        ? (n = 1e3)
        : t >= 0.1 && t < 1
        ? (n = 800)
        : t >= 1 && t < 5
        ? (n = 500)
        : t >= 5 && t < 10
        ? (n = 400)
        : t >= 10 && t < 50
        ? (n = 300)
        : t >= 50 && (n = 250);
      let u = n * t * e.weight;
      ymaps.route([r, l], { routingMode: "auto" }).then(
        function (e) {
          let t = e.getLength() / 1e3,
            n = u + 10 * t;
          document.querySelector("#result").innerHTML =
            "Стоимость доставки: " + n.toFixed(2) + " руб.";
        },
        function (e) {
          alert("Возникла ошибка: " + e.message);
        }
      );
    })();
  } else if ("multiple" === u) {
    !(function () {
      let e = parseInt(
          document.querySelector("#container").childElementCount / 5
        ),
        t = 0;
      for (let n = 1; n <= e; n++) {
        let u = {
          weight: parseFloat(
            document.querySelector(`input[name="weight${n}"]`).value
          ),
          length: parseFloat(
            document.querySelector(`input[name="length${n}"]`).value
          ),
          width: parseFloat(
            document.querySelector(`input[name="width${n}"]`).value
          ),
          height: parseFloat(
            document.querySelector(`input[name="height${n}"]`).value
          ),
        };
        o.push(u);
        let i = u.weight,
          a = u.length * u.width * u.height,
          c = 0;
        0 == a
          ? (c = 0)
          : a < 0.1
          ? (c = 1e3)
          : a >= 0.1 && a < 1
          ? (c = 800)
          : a >= 1 && a < 5
          ? (c = 500)
          : a >= 5 && a < 10
          ? (c = 400)
          : a >= 10 && a < 50
          ? (c = 300)
          : a >= 50 && (c = 250);
        let h = c * a * i;
        ymaps.route([r, l], { routingMode: "auto" }).then(
          function (u) {
            let o = u.getLength() / 1e3;
            if (((t += h + 10 * o), n === e)) {
              document.querySelector("#result").innerHTML =
                "Стоимость доставки: " + t.toFixed(2) + " руб.";
            }
          },
          function (e) {
            alert("Возникла ошибка: " + e.message);
          }
        );
      }
    })();
  }
}








