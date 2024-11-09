// Access the HTML components
const searchButton = document.querySelector(".btn");
const searchBox = document.querySelector(".search-box");
const cityName = document.querySelector(".cur-location");
const tempDetails = document.querySelector("temp-details");
const curDate = document.querySelector("cur-date");
const curLocation = document.querySelector("cur-location");

// Function for capitalizes words
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
    curLocation.innerHTML = "Please enter a city name";
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
    cityName.innerHTML = "City not found";
  }
});

// Function to fetch data
async function fetchWeatherData(city) {
  const APIUrl = `${APIBaseUrl}?q=${city}&appid=${APIKey}&units=metric`;
  const res = await fetch(APIUrl);
  if (!res.ok) {
    throw new Error("Error fetching weather data");
  }
  return res.json();
}
// Update current weather
