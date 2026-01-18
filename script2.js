let latitude = 50.02513; // широта
let longitude = 36.25694; // довгота
let zoom = 18; // зум

let fromProjection = new OpenLayers.Projection("EPSG:4326"); // Перетворення з WGS
let toProjection = new OpenLayers.Projection("EPSG:900913"); // до сферичної проекції Меркатора

// розрахунок позиціонування
let position = new OpenLayers.LonLat(longitude, latitude).transform(
  fromProjection,
  toProjection,
);

map = new OpenLayers.Map("demoMap");
let mapnik = new OpenLayers.Layer.OSM();
map.addLayer(mapnik);

// додаємо маркери
let markers = new OpenLayers.Layer.Markers("Markers");
map.addLayer(markers);
markers.addMarker(new OpenLayers.Marker(position));
map.setCenter(position, zoom);

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map");
  mapLink.href = "";
  mapLink.innerHTML = "";

  function success(position) {
    latitude = position.coords.latitude; // перерахунок координат
    longitude = position.coords.longitude; // перерахунок координат

    status.innerHTML = "";

    mapLink.href = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`;

    mapLink.innerHTML = `Широта: ${latitude}°, Довгота: ${longitude}°`;

    // перерахунок позиціонування
    position = new OpenLayers.LonLat(longitude, latitude).transform(
      fromProjection,
      toProjection,
    );

    // додаємо маркери
    markers.addMarker(new OpenLayers.Marker(position));
    map.setCenter(position, zoom);
  }

  function error() {
    status.innerHTML = "Неможливо отримати дані геолокації.";
  }

  if (!navigator.geolocation) {
    status.innerHTML = "Геолокація не підтримується вашим браузером.";
  } else {
    status.innerHTML = "Йде пошук...";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find").addEventListener("click", geoFindMe);
