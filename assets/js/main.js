// Import modules
import { displayLocation } from './Modules/location.js';
import { displayCurrentWeather } from './Modules/weather.js';
// import { displayUpcomingWeather } from './Modules/upcomingWeather.js';

// Function to initialize the application
async function init() {
    try {
      // Display the user's location
      await displayLocation();
  
      // Display the current weather
      await displayCurrentWeather();
  
      // Display upcoming weather for the next seven days
      // displayUpcomingWeather();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // Call the init function when the page loads
  window.addEventListener('load', init);