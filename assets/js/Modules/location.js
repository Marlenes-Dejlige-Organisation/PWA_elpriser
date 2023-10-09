// location.js

let latitude;
let longitude;

function getLocation() {
  // Check if geolocation is available in the browser
  if ("geolocation" in navigator) {
    // Use geolocation to get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      // Extract latitude and longitude from the position object
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Set the values of latitude and longitude
      latitude = lat;
      longitude = lon;

      // Log the values to check
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Call the handleLocation function to handle and display the location
      handleLocation(lat, lon);
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
}

function handleLocation(lat, lon) {
  console.log("Latitude: " + lat);
  console.log("Longitude: " + lon);

  // Your code to use the latitude and longitude here
  findNearestCity(lat, lon);
}

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

// Function to display the user's location
function displayLocation() {
  // Check if geolocation is available in the browser
  if ("geolocation" in navigator) {
    // Use geolocation to get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      // Extract latitude and longitude from the position object
      const { latitude, longitude } = position.coords;

      // Call the handleLocation function to handle and display the location
      handleLocation(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
}
export { latitude, longitude, getLocation, handleLocation, findNearestCity, displayLocation };