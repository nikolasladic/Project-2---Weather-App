const APIKey = "c89a66dd3f34858bd9f2e6dd41428f0b";
// const APIUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=sibenik`;

const APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=sibenik&units=metric`;

function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function checkWeather() {
  const res = await fetch(APIUrl + `&appid=${APIKey}`);
  const data = await res.json();

  const sortedData = groupByDay(data.list);
  console.log(sortedData);

  console.log(data.list);

  // document.querySelector(".cur-location").innerHTML = data.name;
  // document.querySelector(".temp-details").innerHTML =
  //   Math.round(data.main.temp) + "°C";
  // document.querySelector(".weather-description").innerHTML = capitalizeWords(
  //   data.weather[0].description
  // );
  // document.querySelector(".feels-like").innerHTML =
  //   "Feels like: " + Math.round(data.main.feels_like) + " °C";
  // document.querySelector(".humidity").innerHTML =
  //   "Humidity: " + Math.round(data.main.humidity) + "%";
  // document.querySelector(".wind").innerHTML =
  //   "Wind: " + Math.round(data.wind.speed) + " km/h";
}

function groupByDay(data) {
  return data.reduce((acc, item) => {
    // Convert timestamp to date string (e.g., "2024-11-01")
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];

    // Initialize array for the date if it doesn't exist
    if (!acc[date]) {
      acc[date] = [];
    }

    // Push the item to the corresponding date array
    acc[date].push(item);

    return acc;
  }, {});
}

checkWeather();
