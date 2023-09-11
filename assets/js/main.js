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

// Function to get current weather data
function getCurrentWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

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

// Function to get timetable data for the next days
function getTimeTableForNextDays() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

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


