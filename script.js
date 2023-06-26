console.log("Hello World");

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const weatherInfo = document.querySelector('#weather-info');

let xhr;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const city = input.value;
  if (city !== '') {
    if (xhr && xhr.readyState !== 4) {
      xhr.abort(); // Abort the previous request if it's still ongoing
    }
    getWeather(city);
    input.value = '';
  }
});
// fetching data from the server 
function getWeather(city) {
  const apiKey = 'ef0fc54e379e8338f360b511c7cbe03f'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayWeather(data);
      } else {
        const errorMessage = JSON.parse(xhr.responseText).message;
        displayError(errorMessage);
      }
    }
  };

  xhr.open('GET', apiUrl);
  xhr.send();
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  const weatherHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°c</p>
    <p>Description: ${description}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}

function displayError(message) {
  weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}

