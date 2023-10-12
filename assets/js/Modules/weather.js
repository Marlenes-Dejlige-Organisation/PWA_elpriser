// weather.js

export async function fetchWeatherData(lat, lon, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Weather data not found');
      }
      return response.json();
  } catch (error) {
      throw error;
  }
}

export async function fetchWeatherForecast(lat, lon, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Weather forecast data not found');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      throw error;
  }
}