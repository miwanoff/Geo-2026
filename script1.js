function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map");
  mapLink.href = "";
  mapLink.innerHTML = "";

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    status.innerHTML = "";
    mapLink.href = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`;
    mapLink.innerHTML = `Широта: ${latitude}°, Довгота: ${longitude}°`;
  }

  function error() {
    status.innerHTML = "Неможливо одержати дані геолокації.";
  }

  if (!navigator.geolocation) {
    status.innerHTML = "Геолокація не підтримується вашим браузером.";
  } else {
    status.innerHTML = "Йде пошук...";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find").addEventListener("click", geoFindMe);