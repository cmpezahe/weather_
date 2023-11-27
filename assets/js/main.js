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

  // Get DOM elements
  const weatherCardsDiv = document.querySelector(".weather-cards");
  const nameEl = document.getElementById("name_");
  const temperatureElement = document.getElementById("temperature_");
  const dateEl = document.getElementById("date_");
  const weatherEL = document.getElementById("weather_condition");
  const iconEl = document.getElementById("icons_");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const feelslikeElement = document.getElementById("feels_like");

  // Update DOM elements with weather data
  nameEl.textContent = locationName;
  temperatureElement.textContent = temperatureValue;
  dateEl.textContent = locationTime;
  weatherEL.textContent = weatherCondition;
  iconEl.setAttribute("src", `http:${weatherIcon}`);
  humidityElement.textContent = `Humidity: ${humidityValue}%`;
  windElement.textContent = `Wind: ${windValue} mph`;
  feelslikeElement.textContent = `Feels Like: ${feelslikeValue}°C`;
};

// Function to fetch weather data
const fetchData = async (inputdata) => {
  try {
    // Validate user input
    if (!inputdata.trim()) {
      alert("Please enter a location");
      return;
    }

    // Construct API URL
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=df3de6076bb94384ba8114637232611&q=${inputdata}&aqi=no`;

    // Fetch weather data
    const response = await fetch(API_URL);
    const data = await response.json();

    updateWeatherData(data);

    console.log(data);
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

// Porfolio
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
//?=============== FIVE DAYS FORCOST =================
