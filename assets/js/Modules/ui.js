import { degreesToCompass } from "./utils.js";

// Define a mapping of weather descriptions to icon URLs
const weatherIconMapping = {
    'clear sky': 'assets/img/vejrikoner/sol.png',
    'few clouds': 'assets/img/vejrikoner/letskyet.png',
    'scattered clouds': 'assets/img/vejrikoner/skyet.png',
    'broken clouds': 'assets/img/vejrikoner/skyet.png',
    'overcast clouds': 'assets/img/vejrikoner/skyet.png',
    'light rain': 'assets/img/vejrikoner/Regn.png',
    'moderate rain': 'assets/img/vejrikoner/Regn.png',
    'snow': 'assets/img/vejrikoner/sne.png',
    'default': 'assets/img/asshat.png' // Default icon for unknown weather conditions
};

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

    if (weatherIconMapping[weatherDescription.toLowerCase()]) {
        iconSrc = weatherIconMapping[weatherDescription.toLowerCase()];
    } else {
        // If the weather description is unknown, display a default icon
        iconSrc = 'assets/img/asshat.png';
        console.log(`Unknown weather description: ${weatherDescription}`);
    }

    const sunIcon = 'assets/img/symboler/sol_opogned_ikon.png';
    weatherInfo.innerHTML = `
        <div class="weatherInfo">
            <div class="topInfo">
                <div class="topLeft">
                    <p class="date">${year}-${month}-${day}</p>
                </div>
                <div class="topRight">
                    <div class="sunriseIcon">
                        <img src="${sunIcon}">
                    </div>
                    <div class="sunTime">
                        <p>${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
            <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>Temperature: ${weatherData.main.temp.toFixed(1)}°C</p>
            <img src="${windDirectionIcon}" alt="windDirection" style="width:5%";/>
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
            const forecastWeatherDescription = forecast.weather[0].description.toLowerCase(); // Convert to lowercase

            // Determine the weather icon source based on forecastWeatherDescription
            const weatherIconSrc = weatherIconMapping[forecastWeatherDescription] || weatherIconMapping.default;

            upcomingWeatherHTML += `
            <div class="upcomingHours">
                <p>${forecastTime}: ${forecastTemperature}°C</p>
                <img src="${weatherIconSrc}" alt="${forecastWeatherDescription}" class="upcoming-weather-icon">
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

// UPCOMING DAYS WEATHER
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

        // Loop through the forecast data and display upcoming days
for (let i = 0; i < forecastData.list.length; i++) {
    const forecast = forecastData.list[i];
    const forecastDate = new Date(forecast.dt * 1000);
    const dayName = dayNames[forecastDate.getDay()];

    // Check if this day has already been displayed
    if (!displayedDays[dayName]) {
        const forecastTemperature = forecast.main.temp.toFixed(1);
        const forecastWeatherDescription = forecast.weather[0].description.toLowerCase(); // Convert to lowercase

        // Determine the weather icon source based on forecastWeatherDescription
        const weatherIconSrc = weatherIconMapping[forecastWeatherDescription] || weatherIconMapping.default;

        // Create the HTML for the forecast entry
        const forecastEntryHTML = `
            <div class="upcomingDays">
                <h4>${dayName}</h4>
                <p>Temperature: ${forecastTemperature}°C</p>
                <img src="${weatherIconSrc}" alt="${forecastWeatherDescription}" class="upcoming-days-weather-icon">
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