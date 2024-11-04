const APIKey = "";
const APIUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=sibenik`;

function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function checkWeather() {
  const res = await fetch(APIUrl + `&appid=${APIKey}`);
  let data = await res.json();

  console.log(data);

  document.querySelector(".cur-location").innerHTML = data.name;
  document.querySelector(".temp-details").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".weather-description").innerHTML = capitalizeWords(
    data.weather[0].description
  );
  document.querySelector(".feels-like").innerHTML =
    "Feels like: " + Math.round(data.main.feels_like) + " °C";
  document.querySelector(".humidity").innerHTML =
    "Humidity: " + Math.round(data.main.humidity) + "%";
  document.querySelector(".wind").innerHTML =
    "Wind: " + Math.round(data.wind.speed) + " km/h";
}
checkWeather();
