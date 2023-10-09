// utility.js

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
  
  // Export the utility functions
  export { degreesToCompass, windSpeedToBeaufort };  