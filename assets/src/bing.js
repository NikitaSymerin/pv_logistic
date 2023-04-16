var map,
  searchManager,
  zone1 = [],
  zone2 = [],
  zone3 = [],
  volume = 1;
function GetMap() {
  var o = new Microsoft.Maps.Map("#myMap", {
    credentials:
      "AuhLPv41yqdhHyrTczcWhRj1Ez4w64yryuGGaA7aMBu9X1hqpzjhsgaCKXzAw4b1",
    center: new Microsoft.Maps.Location(55.753636, 37.620575),
    zoom: 10,
  });
  Microsoft.Maps.loadModule("Microsoft.Maps.Search", function () {
    searchManager = new Microsoft.Maps.Search.SearchManager(o);
  });
  var t = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(55.681038, 37.64674),
    {
      title: "Зона 1",
      visible: !0,
    }
  );
  o.entities.push(t);
  var n = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(55.765651, 37.442756),
    {
      title: "Зона 2",
      visible: !0,
    }
  );
  o.entities.push(n);
  n = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(55.776413, 37.765936),
    {
      title: "Зона 2",
      visible: !0,
    }
  );
  o.entities.push(n);
  var s = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(55.84342, 37.610141),
    {
      title: "Зона 3",
      visible: !0,
    }
  );
  o.entities.push(s),
    Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
      for (
        var t = [
            {
              name: "Зона 1",
              polygon: new Microsoft.Maps.Polygon(
                [
                  new Microsoft.Maps.Location(55.70925, 37.583294),
                  new Microsoft.Maps.Location(55.638727, 37.459412),
                  new Microsoft.Maps.Location(55.610859, 37.491275),
                  new Microsoft.Maps.Location(55.596875, 37.511153),
                  new Microsoft.Maps.Location(55.576594, 37.594803),
                  new Microsoft.Maps.Location(55.576133, 37.596059),
                  new Microsoft.Maps.Location(55.572144, 37.672502),
                  new Microsoft.Maps.Location(55.602781, 37.754742),
                  new Microsoft.Maps.Location(55.653949, 37.837523),
                  new Microsoft.Maps.Location(55.687121, 37.829504),
                  new Microsoft.Maps.Location(55.702023, 37.79198),
                  new Microsoft.Maps.Location(55.709557, 37.729716),
                  new Microsoft.Maps.Location(55.719807, 37.701947),
                  new Microsoft.Maps.Location(55.711488, 37.672248),
                  new Microsoft.Maps.Location(55.703484, 37.657164),
                  new Microsoft.Maps.Location(55.705859, 37.621058),
                  new Microsoft.Maps.Location(55.70129, 37.611559),
                  new Microsoft.Maps.Location(55.709364, 37.583298),
                ],
                {
                  fillColor: "rgba(0, 255, 0, 0.5)",
                  strokeThickness: 2,
                }
              ),
            },
            {
              name: "Зона 2",
              polygon: new Microsoft.Maps.Polygon(
                [
                  new Microsoft.Maps.Location(55.785245, 37.565583),
                  new Microsoft.Maps.Location(55.800757, 37.531146),
                  new Microsoft.Maps.Location(55.805972, 37.510631),
                  new Microsoft.Maps.Location(55.812959, 37.474759),
                  new Microsoft.Maps.Location(55.821129, 37.446563),
                  new Microsoft.Maps.Location(55.8327, 37.395125),
                  new Microsoft.Maps.Location(55.807429, 37.387589),
                  new Microsoft.Maps.Location(55.789755, 37.372611),
                  new Microsoft.Maps.Location(55.784307, 37.370017),
                  new Microsoft.Maps.Location(55.749663, 37.368437),
                  new Microsoft.Maps.Location(55.71102, 37.387404),
                  new Microsoft.Maps.Location(55.692912, 37.411001),
                  new Microsoft.Maps.Location(55.689133, 37.41413),
                  new Microsoft.Maps.Location(55.682959, 37.416892),
                  new Microsoft.Maps.Location(55.662365, 37.432491),
                  new Microsoft.Maps.Location(55.638727, 37.459412),
                  new Microsoft.Maps.Location(55.70925, 37.583294),
                  new Microsoft.Maps.Location(55.714889, 37.576363),
                  new Microsoft.Maps.Location(55.7246, 37.550494),
                  new Microsoft.Maps.Location(55.74035, 37.53517),
                  new Microsoft.Maps.Location(55.752027, 37.531376),
                  new Microsoft.Maps.Location(55.767305, 37.537686),
                  new Microsoft.Maps.Location(55.773512, 37.545604),
                  new Microsoft.Maps.Location(55.774588, 37.552965),
                ],
                {
                  fillColor: "rgba(255, 165, 0, 0.5)",
                  strokeThickness: 2,
                }
              ),
            },
            {
              name: "Зона 4",
              polygon: new Microsoft.Maps.Polygon(
                [
                  new Microsoft.Maps.Location(55.719807, 37.701947),
                  new Microsoft.Maps.Location(55.709557, 37.729716),
                  new Microsoft.Maps.Location(55.702023, 37.79198),
                  new Microsoft.Maps.Location(55.687121, 37.829504),
                  new Microsoft.Maps.Location(55.697571, 37.829966),
                  new Microsoft.Maps.Location(55.71376, 37.838058),
                  new Microsoft.Maps.Location(55.743972, 37.841861),
                  new Microsoft.Maps.Location(55.770439, 37.843146),
                  new Microsoft.Maps.Location(55.814319, 37.838752),
                  new Microsoft.Maps.Location(55.813958, 37.838578),
                  new Microsoft.Maps.Location(55.810687, 37.811388),
                  new Microsoft.Maps.Location(55.8095, 37.780018),
                  new Microsoft.Maps.Location(55.801989, 37.748515),
                  new Microsoft.Maps.Location(55.795416, 37.71161),
                  new Microsoft.Maps.Location(55.793534, 37.691859),
                  new Microsoft.Maps.Location(55.789139, 37.680356),
                  new Microsoft.Maps.Location(55.781367, 37.669749),
                  new Microsoft.Maps.Location(55.776952, 37.680552),
                  new Microsoft.Maps.Location(55.771568, 37.687781),
                  new Microsoft.Maps.Location(55.769683, 37.68882),
                  new Microsoft.Maps.Location(55.763734, 37.685219),
                  new Microsoft.Maps.Location(55.760273, 37.684487),
                  new Microsoft.Maps.Location(55.758617, 37.685131),
                  new Microsoft.Maps.Location(55.75433, 37.693789),
                  new Microsoft.Maps.Location(55.746925, 37.699703),
                  new Microsoft.Maps.Location(55.73883, 37.697529),
                  new Microsoft.Maps.Location(55.72398, 37.712582),
                ],
                {
                  fillColor: "rgba(255, 165, 0, 0.5)",
                  strokeThickness: 2,
                }
              ),
            },
            {
              name: "Зона 3",
              polygon: new Microsoft.Maps.Polygon(
                [
                  new Microsoft.Maps.Location(55.785245, 37.565583),
                  new Microsoft.Maps.Location(55.774588, 37.552965),
                  new Microsoft.Maps.Location(55.773512, 37.545604),
                  new Microsoft.Maps.Location(55.767305, 37.537686),
                  new Microsoft.Maps.Location(55.752027, 37.531376),
                  new Microsoft.Maps.Location(55.74035, 37.53517),
                  new Microsoft.Maps.Location(55.7246, 37.550494),
                  new Microsoft.Maps.Location(55.722158, 37.555719),
                  new Microsoft.Maps.Location(55.714881, 37.576318),
                  new Microsoft.Maps.Location(55.707611, 37.586292),
                  new Microsoft.Maps.Location(55.701004, 37.610422),
                  new Microsoft.Maps.Location(55.705786, 37.621593),
                  new Microsoft.Maps.Location(55.703225, 37.657028),
                  new Microsoft.Maps.Location(55.712107, 37.673513),
                  new Microsoft.Maps.Location(55.72398, 37.712582),
                  new Microsoft.Maps.Location(55.73883, 37.697529),
                  new Microsoft.Maps.Location(55.746925, 37.699703),
                  new Microsoft.Maps.Location(55.75433, 37.693789),
                  new Microsoft.Maps.Location(55.758617, 37.685131),
                  new Microsoft.Maps.Location(55.760273, 37.684487),
                  new Microsoft.Maps.Location(55.763734, 37.685219),
                  new Microsoft.Maps.Location(55.769683, 37.68882),
                  new Microsoft.Maps.Location(55.771568, 37.687781),
                  new Microsoft.Maps.Location(55.776952, 37.680552),
                  new Microsoft.Maps.Location(55.781367, 37.669749),
                  new Microsoft.Maps.Location(55.789139, 37.680356),
                  new Microsoft.Maps.Location(55.793534, 37.691859),
                  new Microsoft.Maps.Location(55.795416, 37.71161),
                  new Microsoft.Maps.Location(55.801989, 37.748515),
                  new Microsoft.Maps.Location(55.8095, 37.780018),
                  new Microsoft.Maps.Location(55.810687, 37.811388),
                  new Microsoft.Maps.Location(55.813958, 37.838578),
                  new Microsoft.Maps.Location(55.823956, 37.835561),
                  new Microsoft.Maps.Location(55.829587, 37.829095),
                  new Microsoft.Maps.Location(55.894136, 37.698181),
                  new Microsoft.Maps.Location(55.897521, 37.64389),
                  new Microsoft.Maps.Location(55.910811, 37.581782),
                  new Microsoft.Maps.Location(55.907006, 37.536077),
                  new Microsoft.Maps.Location(55.90466, 37.525199),
                  new Microsoft.Maps.Location(55.884138, 37.470697),
                  new Microsoft.Maps.Location(55.881561, 37.444656),
                  new Microsoft.Maps.Location(55.864753, 37.402343),
                  new Microsoft.Maps.Location(55.846124, 37.39149),
                  new Microsoft.Maps.Location(55.8327, 37.395125),
                  new Microsoft.Maps.Location(55.821129, 37.446563),
                  new Microsoft.Maps.Location(55.812959, 37.474759),
                  new Microsoft.Maps.Location(55.805972, 37.510631),
                  new Microsoft.Maps.Location(55.800757, 37.531146),
                  new Microsoft.Maps.Location(55.785245, 37.565583),
                ],
                {
                  fillColor: "rgba(0, 0, 255, 0.5)",
                  strokeThickness: 2,
                }
              ),
            },
          ],
          n = 0;
        n < t.length;
        n++
      ) {
        var s = t[n];
        o.entities.push(s.polygon);
      }
      function a(o) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n];
          if (Microsoft.Maps.SpatialMath.Geometry.intersects(o, s.polygon))
            return s.name;
        }
      }
      document
        .getElementById("search-btn")
        .addEventListener("click", function () {
          if ("" !== (t = document.getElementById("volume-input").value)) {
            var t = parseInt(document.getElementById("volume-input").value),
              n = (a(location), document.getElementById("address-input").value);
            if ("" !== n)
              new Microsoft.Maps.Search.SearchManager(o).geocode({
                where: n,
                callback: function (s) {
                  if (s && s.results && s.results.length > 0) {
                    var i = document.getElementById("address-input"),
                      c =
                        "https://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" +
                        encodeURIComponent(
                          "Московская ул., 14, стр. 2, микрорайон Климовск, Подольск"
                        ) +
                        "&wp.1=" +
                        encodeURIComponent(i.value) +
                        "&avoid=minimizeTolls&key=AuhLPv41yqdhHyrTczcWhRj1Ez4w64yryuGGaA7aMBu9X1hqpzjhsgaCKXzAw4b1";
                    fetch(c)
                      .then((o) => o.json())
                      .then((i) => {
                        var c = i.resourceSets[0].resources[0].travelDistance,
                          M = 32 * c,
                          e = s.results[0].location,
                          r = a(e),
                          p = 0;
                        "Зона 1" == r
                          ? (p = 100 * t + 1e3)
                          : "Зона 2" == r || "Зона 4" == r
                          ? (p = 100 * t + 2e3)
                          : "Зона 3" == r
                          ? (p = 100 * t + 3e3)
                          : ((p = parseInt(M.toFixed()) + 100 * t),
                            (n = n),
                            (r = "Расстояние между точками: " + c + " км")),
                          swal({
                            title: "Информация о грузе",
                            text:
                              r +
                              "\nОбъем: " +
                              t +
                              " куб.м\nСтоимость забора груза из " +
                              n +
                              ": " +
                              p +
                              " рублей.",
                            icon: "info",
                          }),
                          o.setView({
                            center: e,
                            zoom: 12,
                          });
                      });
                  }
                },
              });
            else swal("Пожалуйста, введите адрес", "", "error");
          } else swal("Пожалуйста, введите объем", "", "error");
        });
    });
}
