import { degreesToCompass } from "./utils.js";

// CURRENT WEATHER
export function displayWeatherInfo(weatherData, weatherDescription) {
    const weatherInfo = document.getElementById('weatherInfo');
    const currentDate = new Date();

    // Get the current date components (numbers)
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Get wind direction as compass direction
    const windDirection = degreesToCompass(weatherData.wind.deg);

    const windDirectionIcon = 'assets/img/symboler/vind2.png';
    // Determine the weather icon based on weatherDescription
    let iconSrc;

    if (weatherDescription.toLowerCase().includes('rain')) {
        iconSrc = 'assets/img/vejrikoner/Regn.png';
    } else if (weatherDescription.toLowerCase().includes('clouds')) {
        if (weatherDescription.toLowerCase().includes('few clouds') || weatherDescription.toLowerCase().includes('broken clouds')) {
            iconSrc = 'assets/img/vejrikoner/letskyet.png';
        } else {
            iconSrc = 'assets/img/vejrikoner/skyet.png';
        }
    } else if (weatherDescription.toLowerCase() === 'clear' || weatherDescription.toLowerCase() === 'clear sky') {
        iconSrc = 'assets/img/vejrikoner/sol.png';
    } else if (weatherDescription.toLowerCase() === 'snow') {
        iconSrc = 'assets/img/vejrikoner/sne.png';
    } else {
        // If the weather description is unknown, display a default icon
        iconSrc = 'assets/img/asshat.png';
        console.log(`Unknown weather description: ${weatherDescription}`);
    }

    weatherInfo.innerHTML = `
        <div class="weatherInfo">
            <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>Date: ${year}-${month}-${day}</p>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            <img src="${windDirectionIcon}" alt="windDirection" />
            <p>Wind: ${weatherData.wind.speed} m/s, ${windDirection}</p>
            <img class="current-weather-icon" src="${iconSrc}" alt="${weatherDescription}" />
        </div>
    `;

    return iconSrc; // Return the weather icon URL
}

// UPCOMING WEATHER
export function displayUpcomingWeather(forecastData, weatherIconSrc) {
    const upcomingWeather = document.getElementById('upcomingWeather');

    // Check if the 'upcomingWeather' element exists
    if (upcomingWeather) {
        let upcomingWeatherHTML = `
            <h3>Upcoming Weather:</h3>
            <div>`;

        // Loop through the forecast data and construct the content
        for (const forecast of forecastData.list) {
            const forecastTime = new Date(forecast.dt * 1000).toLocaleTimeString();
            const forecastTemperature = forecast.main.temp.toFixed(1);

            upcomingWeatherHTML += `
                <div class="upcomingHours">
                    <p>${forecastTime}: ${forecastTemperature}°C</p>
                    <img src="${weatherIconSrc}" alt="${forecast.weather[0].description}" class="upcoming-weather-icon">
                </div>`;
        }

        upcomingWeatherHTML += `
            </div>
        `;

        // Set the entire HTML content to the upcomingWeather element
        upcomingWeather.innerHTML = upcomingWeatherHTML;
    } else {
        console.error("Element with ID 'upcomingWeather' not found.");
    }
}

export function displayUpcomingDaysWeather(forecastData, weatherIconSrc) {
    const upcomingDaysWeather = document.getElementById('upcomingDaysWeather');

    // Check if the 'upcomingDaysWeather' element exists
    if (upcomingDaysWeather) {
        // Initialize the HTML content with the title
        let upcomingDaysWeatherHTML = '<h3>Upcoming Days Weather:</h3>';

        // Define an array of day names
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Loop through the forecast data and display upcoming days
        const daysToDisplay = 5;
        const displayedDays = {}; // To keep track of displayed days

        for (let i = 0; i < forecastData.list.length; i++) {
            const forecast = forecastData.list[i];
            const forecastDate = new Date(forecast.dt * 1000);
            const dayName = dayNames[forecastDate.getDay()];

            // Check if this day has already been displayed
            if (!displayedDays[dayName]) {
                const forecastTemperature = forecast.main.temp.toFixed(1);

                // Create the HTML for the forecast entry
                const forecastEntryHTML = `
                    <div class="upcomingDays">
                        <h4>${dayName}</h4>
                        <p>Temperature: ${forecastTemperature}°C</p>
                        <img src="${weatherIconSrc}" alt="${forecast.weather[0].description}" class="upcoming-days-weather-icon">
                    </div>
                `;

                // Append the forecast entry HTML to the upcomingDaysWeatherHTML
                upcomingDaysWeatherHTML += forecastEntryHTML;

                // Mark this day as displayed
                displayedDays[dayName] = true;
            }

            // Exit the loop when we have displayed the required number of days
            if (Object.keys(displayedDays).length === daysToDisplay) {
                break;
            }
        }

        // Set the entire HTML content to the upcomingDaysWeather element
        upcomingDaysWeather.innerHTML = upcomingDaysWeatherHTML;
    } else {
        console.error("Element with ID 'upcomingDaysWeather' not found.");
    }
}
