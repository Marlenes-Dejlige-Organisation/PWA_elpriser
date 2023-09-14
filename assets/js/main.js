// FetchLocationData() ISSUE: 8

// Define default latitude and longitude values (Copenhagen)
let defaultLatitude = 55.6761;
let defaultLongitude = 12.5683;

// Define variables for latitude and longitude
let latitude;
let longitude;

// Function to get the user's location or use default values
function getLocation() {
  // Call another function or perform actions with latitude and longitude
  handleLocation(latitude, longitude);
}

// Function to handle the location (replace with your own logic)
function handleLocation(latitude, longitude) {
  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);

  // Your code to use the latitude and longitude here
  findNearestCity(latitude, longitude);
}

// Function to find the nearest city or town using OpenCage Geocoding API
function findNearestCity(latitude, longitude) {
  // Your OpenCage API Key
  const apiKey = 'd2ff6a023f11473d9533c806b6da6aba';

  // Make an API request to OpenCage Geocoding API
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract and handle the location information from the API response
      const results = data.results;

      if (results.length > 0) {
        const firstResult = results[0];
        const city = firstResult.components.city || firstResult.components.town || firstResult.components.village;

        if (city) {
          console.log('City:', city);
        } else {
          console.log('No city or town found.');
        }
      } else {
        console.log('No results found.');
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}

// Current WEATHER DATA_med relevant udtræk og rigtige måleenheder. issue:28
// Function to convert wind direction in degrees to compass direction
function degreesToCompass(degrees) {
  const compassDirections = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"
  ];

  // Ensure degrees are between 0 and 360
  degrees = (degrees + 360) % 360;

  // Calculate the index in the compassDirections array
  const index = Math.round(degrees / 22.5);

  // Return the compass direction
  return compassDirections[index];
}

// Function to convert wind speed to Beaufort scale
function windSpeedToBeaufort(windSpeed) {
  if (windSpeed < 0.5) {
    return 0; // Calm
  } else if (windSpeed < 1.5) {
    return 1; // Light air
  } else if (windSpeed < 3.3) {
    return 2; // Light breeze
  } else if (windSpeed < 5.5) {
    return 3; // Gentle breeze
  } else if (windSpeed < 7.9) {
    return 4; // Moderate breeze
  } else if (windSpeed < 10.7) {
    return 5; // Fresh breeze
  } else if (windSpeed < 13.8) {
    return 6; // Strong breeze
  } else if (windSpeed < 17.1) {
    return 7; // Near gale
  } else if (windSpeed < 20.7) {
    return 8; // Gale
  } else if (windSpeed < 24.4) {
    return 9; // Strong gale
  } else if (windSpeed < 28.4) {
    return 10; // Storm
  } else if (windSpeed < 32.6) {
    return 11; // Violent storm
  } else {
    return 12; // Hurricane
  }
}

// Function to get current weather data
// Function to get current weather data
function getCurrentWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract and display the desired weather data
      const temperature = data.main.temp;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
      const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds

      // Convert wind speed to Beaufort scale
      const beaufortScale = windSpeedToBeaufort(windSpeed);

      // Convert wind direction to compass direction
      const compassDirection = degreesToCompass(windDirection);

      // You can convert timestamps to readable dates and times using JavaScript Date objects
      const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
      const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

      // Display the weather data
      console.log('Temperature:', temperature, 'C'); // Temperature in Celsius
      console.log('Wind Speed:', windSpeed, 'm/s');
      console.log('Wind Speed (Beaufort):', beaufortScale);
      console.log('Wind Direction:', compassDirection);
      console.log('Sunrise:', sunriseTime);
      console.log('Sunset:', sunsetTime);

      // Combine sunrise and sunset times into a single string
      const sunriseAndSunset = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;

      // Create an <img> element for the icon
      const iconImg = document.createElement('img');
      iconImg.src = 'assets/img/symboler/sol opogned ikon.png'; // Set the image source

      // Create a <div> element for the 'sunrise' data
      const sunriseDiv = document.getElementById('sunrise');
      sunriseDiv.innerHTML = '';

      // Append the icon and sunrise/sunset text to the 'sunrise' div
      sunriseDiv.appendChild(iconImg); // Add the icon
      sunriseDiv.appendChild(document.createTextNode(sunriseAndSunset)); // Add the combined text
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
  // Attempt to get the user's geolocation
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // If geolocation is successful, obtain the latitude and longitude
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Call the getLocation function with the obtained latitude and longitude
      getLocation();

      // Call the getCurrentWeather function with the obtained latitude and longitude
      getCurrentWeather();

      // Call the getTimeTableForNextDays function with the obtained latitude and longitude
      getTimeTableForNextDays();
    },
    function (error) {
      // If the user denies geolocation or there's an error, use default values
      latitude = defaultLatitude;
      longitude = defaultLongitude;

      // Call the getLocation function with the default latitude and longitude
      getLocation();
    }
  );
} else {
  // Geolocation is not available in this browser, use default values
  latitude = defaultLatitude;
  longitude = defaultLongitude;

  // Call the getLocation function with the default latitude and longitude
  getLocation();
}

// Fetch timeTable() ISSUE: 10
function timeTable() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Behandle data og vis det på din startskærm
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// // Fetch timeTable() ISSUE: 10
// function timeTable() {
//   const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
//   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Extract and display data for the next hours of the current day
//       extractHourlyData(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }__________________________________________________________________________________

// Function to extract and return hourly data as an array
function extractHourlyData(data) {
  // Check if there is available data in the timetable
  if (!data || !data.list || data.list.length === 0) {
    console.log('No available timetable data.');
    return [];
  }

  // Get the current date and time
  const currentTime = new Date();
  const hourlyData = []; // Array to store hourly data

  // Loop through timetable data and extract information for the next hours of the current day
  for (const forecast of data.list) {
    // Convert the forecast timestamp to a JavaScript Date object
    const forecastTime = new Date(forecast.dt * 1000);

    // Check if the forecast is for the current day and the next hours
    if (forecastTime.getDate() === currentTime.getDate()) {
      // Extract the specific data you want
      const temperature = forecast.main.temp;
      const windSpeed = forecast.wind.speed;
      const windDirection = forecast.wind.deg;

      // Create an object with the desired data
      const hourlyInfo = {
        Temperature: temperature + ' °C',
        'Wind Speed': windSpeed + ' m/s',
        'Wind Speed (Beaufort)': windSpeedToBeaufort(windSpeed),
        'Wind Direction': degreesToCompass(windDirection),
      };

      // Push the object to the hourlyData array
      hourlyData.push(hourlyInfo);
    }
  }

  return hourlyData;
}

// Call the timeTable function to fetch and display hourly data
const hourlyData = extractHourlyData(data);
console.log(hourlyData);






// Fetch nextDaysWeather() ISSUE: 11____________________________________________________________________
function nextDaysWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Behandle data og vis det på din startskærm
    })
    .catch((error) => {
      console.error("Error:", error);
    });
<<<<<<< Updated upstream
}


// Hent dato ISSUE: #39
// Function to get the current date
function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

// Call the function to get the current date
const currentDate = getCurrentDate();
console.log('Current Date:', currentDate);

// date-view issue #40
const dateElement = document.getElementById('date');
  dateElement.textContent = 'Current Date: ' + currentDate;


// temperature issue #43  
// Function to display temperature data
function displayTemperature(temperature) {
  const tempElement = document.getElementById('temp');
  tempElement.textContent = 'Temperature: ' + temperature + '°C';
}


// Function to get the current temperature
function getCurrentTemperature() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8'; // Replace with your actual OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract and display the current temperature
      const temperature = data.main.temp;
      displayTemperature(temperature); // Update the 'temp' div with the temperature
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to get the user's location or use default values
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // If geolocation is successful, obtain the latitude and longitude
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Call the getCurrentWeather function with the obtained latitude and longitude
      getCurrentWeather();

      // Call the getCurrentTemperature function with the obtained latitude and longitude
      getCurrentTemperature();
    },
    function (error) {
      // If the user denies geolocation or there's an error, use default values
      latitude = defaultLatitude;
      longitude = defaultLongitude;

      // Call the getCurrentWeather function with the default latitude and longitude
      getCurrentWeather();

      // Call the getCurrentTemperature function with the default latitude and longitude
      getCurrentTemperature();
    }
  );
}

// Call the getLocation function to start the process
getLocation();

//weathersymbols: issue44 - inkluderede mindre tilretning af getTimeTableForNextDays()

// Function to get timetable data for the next days
function getTimeTableForNextDays() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // Extract and display the desired data for the next few days
      const forecastList = data.list;

      if (forecastList.length > 0) {
        // Loop through the forecast data
        forecastList.forEach((forecast) => {
          const dateTime = forecast.dt_txt; // Date and time
          const temperature = forecast.main.temp; // Temperature in Celsius
          const weatherDescription = forecast.weather[0].description; // Weather description

          // Call the function to display the weather icon based on the weather description
          displayWeatherIcon(weatherDescription);

          // Log or process the extracted data as needed
          console.log('Date and Time:', dateTime);
          console.log('Temperature:', temperature, 'C');
          console.log('Weather:', weatherDescription);
        });
      } else {
        console.error('No forecast data found.');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


// Function to display weather icon based on weather description issue 44
function displayWeatherIcon(weatherDescription) {
  const weatherIconElement = document.getElementById('vejrtype'); // Assuming you have an HTML element with the id 'vejrtype'
  const iconImg = document.createElement('img');

  let iconSrc;

  // Check the weather description and set the appropriate icon source
  if (weatherDescription.toLowerCase().includes('clouds')) {
    if (weatherDescription.toLowerCase().includes('few clouds') || weatherDescription.toLowerCase().includes('broken clouds')) {
      // For "few clouds" or "broken clouds"
      iconSrc = 'assets/img/vejrikoner/letskyet.png';
    } else {
      // For other cloud conditions
      iconSrc = 'assets/img/vejrikoner/skyet.png';
    }
  } else if (weatherDescription.toLowerCase() === 'clear') {
    iconSrc = 'assets/img/vejrikoner/sol.png';
  } else if (weatherDescription.toLowerCase() === 'rain') {
    iconSrc = 'assets/img/vejrikoner/regn.png';
  } else if (weatherDescription.toLowerCase() === 'snow') {
    iconSrc = 'assets/img/vejrikoner/sne.png';
  } else {
    // If the weather description is unknown, display a default icon
    iconSrc = 'assets/img/asshat.png';
  }

  iconImg.src = iconSrc; // Set the image source
  weatherIconElement.innerHTML = ''; // Clear previous content
  weatherIconElement.appendChild(iconImg); // Add the weather icon to the HTML element
}





=======
}
>>>>>>> Stashed changes
