// Access the HTML components
const button = document.querySelector(".btn");
const searchBox = document.querySelector(".search-box");
const cityName = document.querySelector(".cur-location");

let weatherData = null; // This will hold the data

// Function for capitalizes words
function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 0) Display OpenWeather API data

// 1) Collect the data from input field
button.addEventListener("click", () => {});

// 2) Send a request to OpenWeather using city name and API
async function fetchWeatherData(city) {
  const APIKey = "c89a66dd3f34858bd9f2e6dd41428f0b";
  const APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=sibenik&units=metric`;

  try {
    const res = await fetch(APIUrl + "&appid=" + APIKey);
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await res.json();
    // 3) Sorting fetched DATA from API
    weatherData = data;
    sortDataByDay(data);
  } catch (error) {
    console.error(error.message);
  }
}
fetchWeatherData();

// 3.1) Function to store data
function sortDataByDay(data) {
  const forecastsByDay = {};

  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toISOString().split("T")[0];
    if (!forecastsByDay[date]) {
      forecastsByDay[date] = [];
    }
    forecastsByDay[date].push(forecast);
  });

  console.log(forecastsByDay); // Check the result in the console or use this data in your UI
}

// 4) Display Weather
