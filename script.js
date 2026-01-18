const info = document.getElementById("status");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Геолокация не підтримуеться вашим браузером.";
  }
}

function showPosition(position) {
  info.innerHTML =
    "Широта: " +
    position.coords.latitude +
    "<br>Долгота: " +
    position.coords.longitude;
}

document.querySelector("#find").addEventListener("click", getLocation);
