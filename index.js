// Access the HTML components
const searchButton = document.querySelector(".btn");
const searchBox = document.querySelector(".search-box");
const cityName = document.querySelector(".cur-location");
const tempDetails = document.querySelector(".temp-details");
const curDate = document.querySelector(".cur-date");
const weekdaysDisplay = document.querySelectorAll(".weekdays-display .col");

// Access the weather svg Icons
const weatherIcons = {
  Clear: "/src/icons/day.svg",
  Clouds: "/src/icons/cloudy.svg",
  Rainy: "/src/icons/rainy-5.svg",
};

// Function to capitalize words
function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Open Weather API details
const APIKey = "c89a66dd3f34858bd9f2e6dd41428f0b";
const APIBaseUrl = `https://api.openweathermap.org/data/2.5/forecast`;

// Fetch weather data on search button click
searchButton.addEventListener("click", async () => {
  const city = searchBox.value.trim();
  if (city === "") {
    cityName.innerText = "Please enter a city name";
    return;
  }

  try {
    const data = await fetchWeatherData(city);
    if (data) {
      updateCurrentWeather(data);
      updateWeeklyForecast(data);
    }
  } catch (error) {
    console.error(error);
    cityName.innerText = "City not found or API error";
  }
});

// Function to fetch data
async function fetchWeatherData(city) {
  const APIUrl = `${APIBaseUrl}?q=${city}&appid=${APIKey}&units=metric`;
  const response = await fetch(APIUrl);
  if (!response.ok) throw new Error("Error fetching weather data");
  return response.json();
}

// Update current weather
function updateCurrentWeather(data) {
  const current = data.list[0];
  cityName.innerText = data.city.name;
  tempDetails.innerText = `${Math.round(current.main.temp)}°C`;
  curDate.innerText = new Date().toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Sort data and update weekly forecast
function updateWeeklyForecast(data) {
  const forecastsByDay = {};

  // Group forecast by day
  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toISOString().split("T")[0];
    if (!forecastsByDay[date]) forecastsByDay[date] = [];
    forecastsByDay[date].push(forecast);
  });

  // Update each day column
  Object.keys(forecastsByDay)
    .slice(0, 5)
    .forEach((date, index) => {
      const dayData = forecastsByDay[date];
      const dayForecast = dayData[0];
      const weekday = new Date(date).toLocaleDateString("en-GB", {
        weekday: "long",
      });

      // Update UI for each day
      weekdaysDisplay[index].querySelector(".day").innerText = weekday;
      weekdaysDisplay[index].querySelector(
        ".temp-range"
      ).innerHTML = `${Math.round(dayForecast.main.temp_max)}°C - ${Math.round(
        dayForecast.main.temp_min
      )}°C`;
      weekdaysDisplay[index].querySelector(".weather-details").innerText =
        capitalizeWords(dayForecast.weather[0].description);
    });
}
