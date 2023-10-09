export function degreesToCompass(degrees) {
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