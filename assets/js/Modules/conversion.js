// conversion.js

// Function to convert wind speed to Beaufort scale
function windSpeedToBeaufort(speed) {
    // Implement the conversion logic here and return the Beaufort scale value
    // Example:
    if (speed < 1) {
      return 0;
    } else if (speed < 4) {
      return 1;
    } else if (speed < 7) {
      return 2;
    }
    // Add more conditions as needed
  }
  
  // Function to convert degrees to compass direction
  function degreesToCompass(degrees) {
    // Implement the conversion logic here and return the compass direction
    // Example:
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
  
  export { windSpeedToBeaufort, degreesToCompass };
  