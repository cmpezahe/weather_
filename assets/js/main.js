// Function to update the DOM elements with weather data
const updateWeatherData = (data) => {
  const {
    location: { name: locationName, localtime: locationTime },
    current: {
      temp_c: temperatureValue,
      condition: { text: weatherCondition, icon: weatherIcon },
      humidity: humidityValue,
      wind_mph: windValue,
      feelslike_c: feelslikeValue,
    },
  } = data;

  // Get DOM elements for current weather
  const weatherContainer = document.querySelector(".weather_container");
  const temperatureElement = document.getElementById("temperature_");
  const iconEl = document.getElementById("icons_");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const feelslikeElement = document.getElementById("feels_like");
  const nameElement = document.getElementById("name_");
  const dateElement = document.getElementById("date_");
  const weatherConditionElement = document.getElementById("weather_condition");

  // Update DOM elements with current weather data
  temperatureElement.textContent = temperatureValue;
  iconEl.setAttribute("src", `http:${weatherIcon}`);
  humidityElement.textContent = `Humidity: ${humidityValue}%`;
  windElement.textContent = `Wind: ${windValue} mph`;
  feelslikeElement.textContent = `Feels Like: ${feelslikeValue}°C`;
  nameElement.textContent = locationName;
  dateElement.textContent = locationTime;
  weatherConditionElement.textContent = weatherCondition;
};

const updateFiveDayForecast = (forecastData) => {
  const forecastCards = document.querySelectorAll(".weather-cards .card");

  forecastData.forEach((day, index) => {
    const {
      date,
      day: {
        avgtemp_c: temp,
        maxwind_mph: wind,
        avghumidity: humidity,
        condition,
      },
    } = day;

    const card = forecastCards[index];
    const dateElement = card.querySelector("h3");
    const iconElement = card.querySelector(".weather-icon");
    const tempElement = card.querySelector("h6:nth-child(3)"); // Updated index to match your HTML
    const windElement = card.querySelector("h6:nth-child(4)"); // Updated index to match your HTML
    const humidityElement = card.querySelector("h6:nth-child(5)"); // Updated index to match your HTML

    // Update DOM elements with 5-day forecast data
    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    dateElement.textContent = `${dayName}`;
    tempElement.textContent = `Temp: ${temp}°C`;
    windElement.textContent = `Wind: ${wind} M/S`;
    humidityElement.textContent = `Humidity: ${humidity}%`;

    // Update the weather icon
    if (condition && condition.icon) {
      iconElement.setAttribute("src", `http:${condition.icon}`);
      iconElement.setAttribute("alt", "Weather Icon");
    }
  });
};

// Function to fetch weather data and 5-day forecast data
const fetchData = async (inputdata) => {
  try {
    // Validate user input
    if (!inputdata.trim()) {
      alert("Please enter a location");
      return;
    }

    // Construct API URLs for current weather and 5-day forecast
    const currentWeatherURL = `http://api.weatherapi.com/v1/current.json?key=df3de6076bb94384ba8114637232611&q=${inputdata}&aqi=no`;
    const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=df3de6076bb94384ba8114637232611&q=${inputdata}&days=5`;

    // Fetch current weather data
    const currentWeatherResponse = await fetch(currentWeatherURL);
    const currentWeatherData = await currentWeatherResponse.json();

    // Fetch 5-day forecast data
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    // Update DOM elements with current weather data
    updateWeatherData(currentWeatherData);

    // Update DOM elements with 5-day forecast data
    updateFiveDayForecast(forecastData.forecast.forecastday);

    console.log(currentWeatherData);
    console.log(forecastData);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

// Event handler for form submission
const getuserInput = (e) => {
  e.preventDefault();

  const userInput = document.getElementById("user_input").value.trim();
  fetchData(userInput);
};

// Event listener for form submission
const form = document.querySelector("form");
form.addEventListener("submit", getuserInput);

// Initial fetch with default location (London)
fetchData("London");

//!====== FILTER JS FILE =================================

// Portfolio
let filterItems = document.querySelectorAll(".temp_filters li");

function activePortfolio() {
  filterItems.forEach((el) => {
    el.classList.remove("filter-active");
    this.classList.add("filter-active");
  });
}

filterItems.forEach((el) => {
  el.addEventListener("click", activePortfolio);
});

// Mixit up filter
let mixerPortfolio = mixitup(".temp_wrap-container", {
  selectors: {
    target: ".temp_item",
  },
  animation: {
    duration: 300,
  },
});
