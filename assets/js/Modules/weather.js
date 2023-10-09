import { degreesToCompass, windSpeedToBeaufort } from './conversion.js';
import { latitude, longitude } from './location.js';

async function fetchCurrentWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    });
}

async function displayCurrentWeather() {
  let weatherData = await fetchCurrentWeather()

  console.log("Weather Data:", weatherData);
  if (!weatherData) {
    console.error('Weather data not available or missing main property.');
    return;
  }

  const temperature = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const windDirection = weatherData.wind.deg;
  const sunriseTimestamp = weatherData.sys.sunrise * 1000; // Convert to milliseconds
  const sunsetTimestamp = weatherData.sys.sunset * 1000; // Convert to milliseconds

  // Convert wind speed to Beaufort scale
  const beaufortScale = windSpeedToBeaufort(windSpeed);

  // Convert wind direction to compass direction
  const compassDirection = degreesToCompass(windDirection);

  // Convert timestamps to readable dates and times
  const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
  const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

  // Display the weather data in the console
  console.log('Temperature:', temperature, 'C');
  console.log('Wind Speed:', windSpeed, 'm/s');
  console.log('Wind Speed (Beaufort):', beaufortScale);
  console.log('Wind Direction:', compassDirection);
  console.log('Sunrise:', sunriseTime);
  console.log('Sunset:', sunsetTime);

  // Combine sunrise and sunset times into a single string
  const sunriseAndSunset = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;

  // Create an <img> element for the icon
  const iconImg = document.createElement('img');
  iconImg.src = 'assets/img/symboler/sol_opogned_ikon.png'; // Set the image source

  // Create a <div> element for the 'sunrise' data
  const sunriseDiv = document.getElementById('sunrise');
  sunriseDiv.innerHTML = '';

  // Append the icon and sunrise/sunset text to the 'sunrise' div
  sunriseDiv.appendChild(iconImg); // Add the icon
  sunriseDiv.appendChild(document.createTextNode(sunriseAndSunset)); // Add the combined text

  fetchCurrentWeather()
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export { displayCurrentWeather };