// const apiKEY =
//   "http://api.weatherapi.com/v1/current.json?key=df3de6076bb94384ba8114637232611&q=London&aqi=no";
let userInput = "London";

const form = document.querySelector("form");
const inputEL = document.getElementById("user_input");

form.addEventListener("submit", getuserInput);

const fetchData = async (inputdata) => {
  try {
    let API_URL = `http://api.weatherapi.com/v1/current.json?key=df3de6076bb94384ba8114637232611&q=${inputdata}&aqi=no`;
    const response = await fetch(API_URL);

    const data = await response.json();
    console.log(data);

    const nameEl = document.getElementById("name_");
    let locationName = data.location.name;
    nameEl.textContent = locationName;
    // console.log(locationName);

    const temperatureElement = document.getElementById("temperature_");
    const temperatureValue = data.current.temp_c;
    temperatureElement.textContent = temperatureValue;
    // console.log(locationName);

    const dateEl = document.getElementById("date_");
    let locationTime = data.location.localtime;
    dateEl.textContent = locationTime;
    // console.log(locationTime);

    const weatherEL = document.getElementById("weather_condition");
    let weatherCondition = data.current.condition.text;
    weatherEL.textContent = weatherCondition;
    // console.log(weatherCondition);

    const iconEl = document.getElementById("icons_");
    let weatherIcon = data.current.condition.icon;
    iconEl.setAttribute("src", "http:" + weatherIcon); // Set the correct src attribute
    // console.log(weatherIcon);

    const humidityElement = document.getElementById("humidity");
    const humidityValue = data.current.humidity;
    humidityElement.textContent = `Humidity: ${humidityValue} %`;
    // console.log(humidityValue);

    const windElement = document.getElementById("wind");
    const windValue = data.current.wind_mph;
    windElement.textContent = `Wind: ${windValue} mph`;

    // console.log(windValue);

    const feelslikeElement = document.getElementById("feels_like");
    const feelslikeValue = data.current.feelslike_c;
    feelslikeElement.textContent = `Feels Like: ${feelslikeValue} °C`;

    // console.log(precipitationValue);
  } catch {
    console.log("Something went wrong");
  }
};

//===== Search Funcations =====
function getuserInput(e) {
  e.preventDefault();
  userInput = inputEL.value;
  fetchData(userInput);
}

//======= End Search Funcations =====

fetchData(userInput);
