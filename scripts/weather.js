const form = document.querySelector("form");
const cityNameInput = document.querySelector("#cityName");
const weatherDiv = document.querySelector("#weather");
const errorDiv = document.querySelector("#error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = cityNameInput.value;
  if (!cityName) {
    errorDiv.textContent = "Please enter a city name";
    return;
  }
  errorDiv.textContent = "";
  weatherDiv.innerHTML = "Loading...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=418b12f34f592cda6e65205b82177a99&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not available. Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const weatherHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temperature}&deg;C</p>
        <p>Description: ${description}</p>
      `;
      weatherDiv.innerHTML = weatherHTML;
    })
    .catch((error) => {
      errorDiv.textContent = error.message;
      weatherDiv.innerHTML = "";
    });
});