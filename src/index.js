let now = new Date();

let h5 = document.querySelector("h5");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h5.innerHTML = `${day} ${hour}:${minutes}`;

//

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#forecast").innerHTML = response.data.weather[0].main;
}

function searchButton(city) {
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function clickCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchButton(city);
}

let searchEngine = document.querySelector("form");
searchEngine.addEventListener("submit", clickCity);

//

function searchCurrent(position) {
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

let currentLocationButton = document.querySelector("#location-select");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchButton("Toronto");

// function changeCelsius() {
//   let currentDegrees = document.querySelector("#degrees");
//   currentDegrees.innerHTML = "14";
// }

// let clickCelsius = document.querySelector("#celsius");
// clickCelsius.addEventListener("click", changeCelsius);

// function changeFahrenheit() {
//   let currentDegrees = document.querySelector("#degrees");
//   currentDegrees.innerHTML = "57";
// }

// let clickFahrenheit = document.querySelector("#fahrenheit");
// clickFahrenheit.addEventListener("click", changeFahrenheit);
