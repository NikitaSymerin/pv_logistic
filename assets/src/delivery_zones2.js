ymaps.ready(init);
function init() {
  let myMap = new ymaps.Map("map2", {
    center: [37.621133, 55.760122],
    zoom: 10,
    controls: ["geolocationControl", "searchControl"],
  });

  placemark1 = new ymaps.Placemark(
    [37.603161, 55.642077],
    {
      iconContent: "Зона 2",
    },
    {
      preset: "islands#greenStretchyIcon",
    }
  );

  myMap.geoObjects.add(placemark1);

  placemark2 = new ymaps.Placemark(
    [37.456208, 55.752529],
    {
      iconContent: "Зона 3",
    },
    {
      preset: "islands#yellowStretchyIcon",
    }
  );

  myMap.geoObjects.add(placemark2);

  placemark3 = new ymaps.Placemark(
    [37.754325, 55.764576],
    {
      iconContent: "Зона 1",
    },
    {
      preset: "islands#redStretchyIcon",
    }
  );

  myMap.geoObjects.add(placemark3);

  placemark4 = new ymaps.Placemark(
    [37.619347, 55.853712],
    {
      iconContent: "Зона 2",
    },
    {
      preset: "islands#greenStretchyIcon",
    }
  );

  myMap.geoObjects.add(placemark4);

  let deliveryPoint = new ymaps.GeoObject(
    {
      geometry: { type: "Point" },
      properties: { iconCaption: "Адрес" },
    },
    {
      preset: "islands#blackDotIconWithCaption",
      draggable: true,
      iconCaptionMaxWidth: "215",
    }
  );

  searchControl = myMap.controls.get("searchControl");
  searchControl.options.set({
    noPlacemark: true,
    placeholderContent: "Введите адрес доставки",
  });
  myMap.geoObjects.add(deliveryPoint);

  let searchButton = document.getElementById("searchButton2");
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    let to = document.querySelector('input[name="addressInput2"]').value;
    let volume = document.querySelector('input[name="volume2"]').value;
    if (to.trim() === "" || volume.trim() === "") {
      Swal.fire("Пожалуйста, введите Адрес и Объем!");
      return;
    }
    let buttonClicks = 0;
    fetch("get-clicks.php")
      .then((response) => response.text())
      .then((data) => {
        buttonClicks = parseInt(data);
        if (buttonClicks >= 100) {
          Swal.fire({
            icon: "error",
            title: "Расчет не был произведен!",
            text: "Увеличьте тарифный план для расчета расстояний",
            imageUrl:
              "https://pvlogistic.ru/wp-content/uploads/2022/09/logotip-krasnyj.jpg",
            imageWidth: 300,
            imageHeight: 100,
            imageAlt: "Логотип",
          });
        } else {
          buttonClicks++;
          writeToFile(buttonClicks);
          let address = document.getElementById("addressInput2").value;
          searchControl.search(address); // Перемещаем вызов searchControl.search() сюда
        }
        function writeToFile(data) {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "set-clicks.php");
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          xhr.send(`clicks=${data}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  function onZonesLoad(json) {
    // Добавляем зоны на карту.
    let deliveryZones = ymaps.geoQuery(json).addToMap(myMap);
    // Задаём цвет и контент балунов полигонов.
    deliveryZones.each(function (obj) {
      obj.events.add("click", function (e) {
        e.preventDefault();
      });
      obj.options.set({
        fillColor: obj.properties.get("fill"),
        fillOpacity: obj.properties.get("fill-opacity"),
        strokeColor: obj.properties.get("stroke"),
        strokeWidth: obj.properties.get("stroke-width"),
        strokeOpacity: obj.properties.get("stroke-opacity"),
      });
      obj.properties.set("balloonContent", obj.properties.get("description"));
    });

    // Проверим попадание результата поиска в одну из зон доставки.
    searchControl.events.add("resultshow", function (e) {
      highlightResult(searchControl.getResultsArray()[e.get("index")]);
    });

    // Проверим попадание метки геолокации в одну из зон доставки.
    myMap.controls
      .get("geolocationControl")
      .events.add("locationchange", function (e) {
        highlightResult(e.get("geoObjects").get(0));
      });

    // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
    deliveryPoint.events.add("dragstart", function () {
      deliveryPoint.properties.set({ iconCaption: "", balloonContent: "" });
      deliveryPoint.options.set("iconColor", "black");
    });

    // По окончании перемещения метки вызываем функцию выделения зоны доставки.
    deliveryPoint.events.add("dragend", function () {
      highlightResult(deliveryPoint);
    });

    function highlightResult(obj) {
      let coords = obj.geometry.getCoordinates(),
        polygon = deliveryZones.searchContaining(coords).get(0);
      zoom = 11;

      function setData(obj, polygon, volume, isNearestPolygon = false) {
        let description = polygon.properties.get("description");
        let price = parseInt(
          description.match(/<strong>.*?(\d+).*?<\/strong>/)[1]
        );
        let zone = parseInt(description.match(/data-zone="(\d+)"/)[1]);
        let priceAdditions = [
          [
            0, 324, 984, 1644, 1644, 2304, 2304, 2304, 2832, 2832, 4680, 4680,
            4680, 4680, 4680,
          ], // Зона 1
          [
            0, 348, 1008, 1668, 1668, 2328, 2328, 2328, 2856, 2856, 5760, 5760,
            5760, 5760, 5760,
          ], // Зона 2
          [
            0, 372, 1032, 1692, 1692, 2352, 2352, 2352, 2880, 2880, 5520, 5520,
            5520, 5520, 5520,
          ], // Зона 3
        ];

        if (volume > 0 && volume <= 15) {
          priceInPolygon =
            parseFloat(price) + priceAdditions[zone - 1][volume - 1];
        } else {
          priceInPolygon = "Cвяжитесь с оператором";
        }

        if (isNearestPolygon) {
          return priceInPolygon;
        } else {
          if (priceInPolygon == "Cвяжитесь с оператором") {
            deliveryPoint.properties.set({
              iconCaption: priceInPolygon,
            });
          } else {
            deliveryPoint.properties.set({
              iconCaption: `Цена ${priceInPolygon.toFixed(
                0
              )} руб. за ${volume} м³`,
            });
          }

          myMap.setZoom(zoom);
        }
      }

      let volume = parseInt(document.getElementById("volume2").value);

      if (polygon) {
        deliveryZones.setOptions("fillOpacity", 0.4);
        polygon.options.set("fillOpacity", 0.8);
        deliveryPoint.geometry.setCoordinates(coords);
        deliveryPoint.options.set("iconColor", polygon.properties.get("fill"));
        setData(obj, polygon, volume);
        zoom = 11;
      } else {
        deliveryZones.setOptions("fillOpacity", 0.4);
        deliveryPoint.geometry.setCoordinates(coords);
        var nearestPolygon = deliveryZones.getClosestTo(coords);
        var distance = nearestPolygon.geometry.getClosest(coords).distance;
        distance = distance / 1000;

        ymaps
          .route(
            [
              { type: "wayPoint", point: coords },
              {
                type: "wayPoint",
                point: nearestPolygon.geometry.getClosest(coords).position,
              },
            ],
            { mapStateAutoApply: true }
          )
          .then(function (route) {
            var distance = route.getLength() / 1000;
            var priceFromNearestPolygon = setData(
              obj,
              nearestPolygon,
              volume,
              true
            );

            if (volume > 15) {
              deliveryPoint.properties.set({
                iconCaption: "Cвяжитесь с оператором",
              });
            } else {
              var priceNotInPolygon = priceFromNearestPolygon + 32 * distance;
              deliveryPoint.properties.set({
                iconCaption: `Цена ${priceNotInPolygon.toFixed(
                  0
                )} руб. за ${volume} м³`,
              });
            }
          });

        myMap.setZoom(zoom);
        deliveryPoint.options.set("iconColor", "black");
      }
    }
  }

  $.ajax({
    url: "data.geojson",
    dataType: "json",
    success: onZonesLoad,
  });
}
