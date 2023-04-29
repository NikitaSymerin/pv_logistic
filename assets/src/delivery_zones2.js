ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map('map2', {
        center: [37.621133, 55.760122],
        zoom: 10,
        controls: ['geolocationControl', 'searchControl']
    });
    
      placemark1 = new ymaps.Placemark([37.603161, 55.642077], {
        iconContent: "Зона 2"
      }, {

        preset: 'islands#yellowStretchyIcon'
      });
    
      myMap.geoObjects.add(placemark1);
    
    placemark2 = new ymaps.Placemark([37.456208, 55.752529], {
            iconContent: "Зона 3"
      }, {

        preset: 'islands#greenStretchyIcon'
      });
    
      myMap.geoObjects.add(placemark2);
    
    placemark3 = new ymaps.Placemark([37.754325, 55.764576], {
            iconContent: "Зона 1"
      }, {

        preset: 'islands#redStretchyIcon'
      });
    
      myMap.geoObjects.add(placemark3);
    
        placemark4 = new ymaps.Placemark([37.619347, 55.853712], {
            iconContent: "Зона 2"
      }, {

        preset: 'islands#yellowStretchyIcon'
      });
    
      myMap.geoObjects.add(placemark4);
      


    

    
    var deliveryPoint = new ymaps.GeoObject({
        geometry: {type: 'Point'},
        properties: {iconCaption: 'Адрес'}
    }, {
        preset: 'islands#blackDotIconWithCaption',
        draggable: true,
        iconCaptionMaxWidth: '215'
    });

        searchControl = myMap.controls.get('searchControl');
    searchControl.options.set({noPlacemark: true, placeholderContent: 'Введите адрес доставки'});
    myMap.geoObjects.add(deliveryPoint);
    
    var searchButton2 = document.getElementById('searchButton2');
    searchButton2.addEventListener('click', function(event) {
      event.preventDefault();
      let to = document.querySelector('input[name="addressInput2"]').value;
      let volume = document.querySelector('input[name="volume2"]').value;
      if (to.trim() === '' || volume.trim() === '') {
        Swal.fire(
          'Пожалуйста, введите Адрес и Объем!'
        );
        return;
      }
      let buttonClicks = 0;
      fetch('get-clicks.php')
        .then(response => response.text())
        .then(data => {
          buttonClicks = parseInt(data);
          if (buttonClicks >= 100) {
            Swal.fire({
              icon: 'error',
              title: 'Расчет не был произведен!',
              text: 'Увеличьте тарифный план для расчета расстояний',
              imageUrl: 'https://pvlogistic.ru/wp-content/uploads/2022/09/logotip-krasnyj.jpg',
              imageWidth: 300,
              imageHeight: 100,
              imageAlt: 'Логотип'
            });
            return;
          }
          buttonClicks++;
          writeToFile(buttonClicks);	
          function writeToFile(data) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'set-clicks.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`clicks=${data}`);
          }
        })
        .catch(error => {
          console.error(error);
        });
      var address = document.getElementById('addressInput2').value;
      searchControl.search(address);
        
    });



    function onZonesLoad(json) {
        // Добавляем зоны на карту.
        var deliveryZones = ymaps.geoQuery(json).addToMap(myMap);
        // Задаём цвет и контент балунов полигонов.
        deliveryZones.each(function (obj) {
          obj.events.add('click', function (e) {
            e.preventDefault();
        });
            obj.options.set({
                fillColor: obj.properties.get('fill'),
                fillOpacity: obj.properties.get('fill-opacity'),
                strokeColor: obj.properties.get('stroke'),
                strokeWidth: obj.properties.get('stroke-width'),
                strokeOpacity: obj.properties.get('stroke-opacity')
            });
            obj.properties.set('balloonContent', obj.properties.get('description'));
            
        });

        // Проверим попадание результата поиска в одну из зон доставки.
        searchControl.events.add('resultshow', function (e) {
            highlightResult(searchControl.getResultsArray()[e.get('index')]);
        });

        // Проверим попадание метки геолокации в одну из зон доставки.
        myMap.controls.get('geolocationControl').events.add('locationchange', function (e) {
            highlightResult(e.get('geoObjects').get(0));
        });

        // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
        deliveryPoint.events.add('dragstart', function () {
            deliveryPoint.properties.set({iconCaption: '', balloonContent: ''});
            deliveryPoint.options.set('iconColor', 'black');
        });

        // По окончании перемещения метки вызываем функцию выделения зоны доставки.
        deliveryPoint.events.add('dragend', function () {
            highlightResult(deliveryPoint);
        });

        function highlightResult(obj) {
            // Сохраняем координаты переданного объекта.
            var coords = obj.geometry.getCoordinates(),
            // Находим полигон, в который входят переданные координаты.
                polygon = deliveryZones.searchContaining(coords).get(0);
                zoom = 11; // Значение зума по умолчанию

            if (polygon) {
                // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                deliveryZones.setOptions('fillOpacity', 0.4);
                polygon.options.set('fillOpacity', 0.8);
                // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                deliveryPoint.geometry.setCoordinates(coords);
                deliveryPoint.options.set('iconColor', polygon.properties.get('fill'));
                // Задаем подпись для метки.
                if (typeof(obj.getThoroughfare) === 'function') {
                    setData(obj);
                } else {
                    // Если вы не хотите, чтобы при каждом перемещении метки отправлялся запрос к геокодеру,
                    // закомментируйте код ниже.
                    ymaps.geocode(coords, {results: 1}).then(function (res) {
                        var obj = res.geoObjects.get(0);
                        setData(obj);
                    });
                }
                zoom = 11;
            } else {
                // Если переданные координаты не попадают в полигон, то задаём стандартную прозрачность полигонов.
                deliveryZones.setOptions('fillOpacity', 0.4);
                // Перемещаем метку по переданным координатам.
                deliveryPoint.geometry.setCoordinates(coords);
                // Находим ближайший полигон и рассчитываем расстояние до него.
                var nearestPolygon = deliveryZones.getClosestTo(coords);
                var distance = nearestPolygon.geometry.getClosest(coords).distance;
                var price = nearestPolygon.properties.get('description');
                price = parseInt(price.match(/<strong>.*?(\d+).*?<\/strong>/)[1]);
                distance = distance / 1000;
                var volume = parseInt(document.getElementById('volume2').value);
                var priceNotInPolygon = (parseFloat(price) + (32 * distance)) * volume;
                // Задаём контент балуна и метки.
                deliveryPoint.properties.set({
                    iconCaption: `Цена ${priceNotInPolygon.toFixed(0)} руб. за ${volume} м³`,
                    //balloonContent: `Расстояние ${distance.toFixed(2)} км`,
                    //balloonContentHeader: ''
                });

                myMap.setZoom(zoom);
                // Перекрашиваем метку в чёрный цвет.
                deliveryPoint.options.set('iconColor', 'black');
            }

            function setData(obj){
                var address = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
                if (address.trim() === '') {
                    address = obj.getAddressLine();
                }
                var price = polygon.properties.get('description');
                price = parseInt(price.match(/<strong>.*?(\d+).*?<\/strong>/)[1]);
                var volume = parseInt(document.getElementById('volume2').value);
                var priceInPolygon = parseFloat(price) * volume;
                deliveryPoint.properties.set({
                  iconCaption: `Цена ${priceInPolygon.toFixed(0)} руб. за ${volume} м³`,
                  //balloonContent: address,
                  //balloonContentHeader: price
                });
                myMap.setZoom(zoom);
            }
        }
    }

    $.ajax({
        url: 'data2.geojson',
        dataType: 'json',
        success: onZonesLoad
    });
}



