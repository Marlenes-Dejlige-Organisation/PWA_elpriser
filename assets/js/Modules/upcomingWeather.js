// Function to fetch upcoming weather data based on latitude and longitude
async function fetchUpcomingWeather(lat, lon) {
    try {
      const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8'; // Replace with your API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching upcoming weather data:', error);
      return null;
    }
  }
  
  // Function to display upcoming weather for the next seven days
  async function displayUpcomingWeather() {
    const upcomingDaysDiv = document.getElementById('upcomingDays');
    upcomingDaysDiv.innerHTML = ''; // Clear previous content
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        const weatherData = await fetchUpcomingWeather(lat, lon);
  
        if (!weatherData) {
          return;
        }
  
        // Initialize an object to track unique days
        const uniqueDays = {};
  
        // Assuming that weatherData.list contains forecast data for the next seven days
        for (let i = 0; i < weatherData.list.length; i++) {
          const forecast = weatherData.list[i];
          const date = new Date(forecast.dt * 1000); // Convert timestamp to date
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          const temperature = forecast.main.temp.toFixed(1); // Temperature in Celsius
  
          // Check if this day has been added to the list already
          if (!uniqueDays[dayOfWeek]) {
            const weatherDescription = forecast.weather[0].description;
  
            // Create a new element for each day's weather information
            const dayElement = document.createElement('div');
  
            // Display weather icon using the displayWeatherIcon function (you can implement this separately)
            const weatherIconElement = document.createElement('div');
            weatherIconElement.innerHTML = displayWeatherIcon(weatherDescription);
  
            // Append the day's weather information and icon to the 'upcomingDays' div
            dayElement.innerHTML = `
              <p>${dayOfWeek}</p>
              <p>${weatherDescription}</p>
              <p>${temperature}°C</p>
            `;
  
            dayElement.appendChild(weatherIconElement);
  
            upcomingDaysDiv.appendChild(dayElement);
  
            // Mark this day as added to the list
            uniqueDays[dayOfWeek] = true;
          }
        }
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }
  
  // Export the functions
  export { fetchUpcomingWeather, displayUpcomingWeather };
  