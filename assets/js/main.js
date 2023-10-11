// main.js

import { fetchWeatherData, fetchWeatherForecast } from './Modules/weather.js';
import { displayWeatherInfo, displayUpcomingWeather, displayUpcomingDaysWeather } from './Modules/ui.js';
import { geocodeCity, reverseGeocode } from './Modules/location.js';

const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8'; // OpenWeatherMap API key
const geocodingApiKey = 'AIzaSyA_UkKyRKopA1AB4chC_rPCnWoqS3pNKuo'; // Opencagedata API key

// Function to get the user's current location
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      const options = {
        enableHighAccuracy: true, // Try to get the most accurate location
        timeout: 10000, // Maximum time to wait for a location (in milliseconds)
        maximumAge: 0 // Don't use a cached location
      };

      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
          navigator.geolocation.clearWatch(watchId); // Stop watching once we have a location
        },
        error => {
          console.error('Error getting user location:', error);
          reject(error);
        },
        options
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      reject(new Error('Geolocation is not available in this browser.'));
    }
  });
}

async function fetchWeatherDataByCoordinates(lat, lon) {
  try {
    const weatherData = await fetchWeatherData(lat, lon, apiKey);

    if (weatherData) {
      // Call displayWeatherInfo and store the returned icon URL
      const weatherIconSrc = displayWeatherInfo(weatherData, weatherData.weather[0].description);

      // Fetch and display the forecast data, passing the icon URL
      const forecastData = await fetchWeatherForecast(lat, lon, apiKey);
      displayUpcomingWeather(forecastData, weatherIconSrc); // Display upcoming weather
      displayUpcomingDaysWeather(forecastData, weatherIconSrc); // Display upcoming days weather
    } else {
      console.error('Weather data not available.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to update the search bar with the user's current location
function updateSearchBarWithLocation(locationData) {
  const cityInput = document.getElementById('cityInput');
  cityInput.value = `${locationData.city}`;
}

// Check if the app has the user's location permission and get weather data
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const coordinates = await getCurrentLocation();
    
    if (coordinates) {
      const reverseGeocodingResult = await reverseGeocode(coordinates.lat, coordinates.lon, geocodingApiKey);
      
      if (reverseGeocodingResult) {
        updateSearchBarWithLocation(reverseGeocodingResult);
        fetchWeatherDataByCoordinates(coordinates.lat, coordinates.lon);
      } else {
        console.error('Reverse geocoding failed.');
        // Handle the case when reverse geocoding fails (fallback or user message)
      }
    } else {
      console.error('User location cannot be determined.');
      // Handle the case when user location can't be determined (fallback or user message)
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle other errors as needed
  }
});

// Modify the search button click event listener to use geocodeCity
document.getElementById('searchButton').addEventListener('click', async () => {
  const cityName = document.getElementById('cityInput').value.trim();
  if (cityName !== '') {
    try {
      const coordinates = await geocodeCity(cityName, geocodingApiKey);
      if (coordinates) {
        updateSearchBarWithLocation({ city: cityName, country: 'Unknown' });
        fetchWeatherDataByCoordinates(coordinates.lat, coordinates.lon);
      } else {
        console.error('Geocoding failed.');
        // Handle the case when geocoding fails (fallback or user message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');

// Add a click event listener to the input field to clear its content
cityInput.addEventListener('click', function () {
  // Clear the content of the input field
  cityInput.value = '';
});

// Add a keypress event listener to the input field
cityInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    // Trigger a click on the button when the "Enter" key is pressed
    searchButton.click();
  }
});