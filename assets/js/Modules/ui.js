// ui.js

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

// CSS classes for background colors based on weather conditions
const backgroundColorClasses = {
    'clear sky': 'body-clear-sky', // Full sun
    'few clouds': 'body-cloudy', // Cloudy
    'scattered clouds': 'body-cloudy', // Cloudy
    'broken clouds': 'body-cloudy', // Cloudy
    'overcast clouds': 'body-cloudy', // Cloudy
    'light rain': 'body-rain', // Rain
    'moderate rain': 'body-rain', // Rain
    'snow': 'body-default', // Default background color for unknown conditions
};

// Define an array of month names
const monthNames = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
];

const weekdayNames = [
    "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"
];


// CURRENT WEATHER
export function displayWeatherInfo(weatherData, weatherDescription) {
    const topInfo = document.getElementById('topInfo');
    const weatherInfo = document.getElementById('weatherInfo');
    const currentDate = new Date();

    // Get the current date components
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();

    // Get the month name
    const monthName = monthNames[monthIndex];

    // Get the day of the Week
    const dayOfWeek = weekdayNames[currentDate.getDay()];

    // Format sunrise and sunset times in 24-hour format
    const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

    // Get wind direction as compass direction
    const windDirection = degreesToCompass(weatherData.wind.deg);
    const windDirectionDegrees = weatherData.wind.deg;

    const windDirectionIcon = 'assets/img/symboler/vind2.png';

    // Determine the weather icon based on weatherDescription
    let iconSrc;
    let bodyBackgroundColorClass;

    if (weatherIconMapping[weatherDescription.toLowerCase()]) {
        iconSrc = weatherIconMapping[weatherDescription.toLowerCase()];
        bodyBackgroundColorClass = backgroundColorClasses[weatherDescription.toLowerCase()] || 'body-default';
    } else {
        // If the weather description is unknown, display a default icon and background color
        iconSrc = 'assets/img/asshat.png';
        bodyBackgroundColorClass = 'body-default';
        console.log(`Unknown weather description: ${weatherDescription}`);
    }

    // Apply the background color class to the body element
    document.body.className = bodyBackgroundColorClass;

    const sunIcon = 'assets/img/symboler/sol_opogned_ikon.png';

    topInfo.innerHTML = `
        <div class="topInfo">
            <div class="topLeft">
                <p class="date">${day} ${monthName}. ${dayOfWeek}</p>
            </div>
            <div class="topRight">
                <div class="sunriseIcon">
                    <img src="${sunIcon}">
                </div>
                <div class="sunTime">
                    <p>${sunriseTime}</p>
                    <p>${sunsetTime}</p>
                </div>
            </div>
        </div>
        
    `;

    weatherInfo.innerHTML = `
        <div class="weatherInfo">
            <div class="imgTemp">
                <img class="current-weather-icon" src="${iconSrc}" alt="${weatherDescription}" />
                <p>${weatherData.main.temp.toFixed(0)}°C</p>
            </div>
            <div class="nu">
                <h2>Vejret lige nu...</h2>
            <div class="wendy">
                <img src="${windDirectionIcon}" alt="windDirection" style=" transform: rotate(${windDirectionDegrees}deg);">
                <p>${weatherData.wind.speed.toFixed(0)}</p>
            </div>
            
        </div>
        <div class="decorative-line"></div>
        
    `;

    return iconSrc; // Return the weather icon URL
}

// UPCOMING WEATHER
export function displayUpcomingWeather(forecastData, iconSrc) {
    const upcomingWeather = document.getElementById('upcomingWeather');

    // Check if the 'upcomingWeather' element exists
    if (upcomingWeather) {
        let upcomingWeatherHTML = `
            <div>`;

        // Loop through the forecast data and construct the content
        for (const forecast of forecastData.list) {
            const forecastTime = new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const forecastTemperature = forecast.main.temp.toFixed(0); // Rundet til nærmeste heltal
            const forecastWeatherDescription = forecast.weather[0].description.toLowerCase(); // Convert to lowercase
            const forecastWindSpeed = forecast.wind.speed.toFixed(0); // Vindhastighed uden decimaler
            const forecastWindDirectionDegrees = forecast.wind.deg; // Vindretning i grader

            // Determine the weather icon source based on forecastWeatherDescription
            const weatherIconSrc = weatherIconMapping[forecastWeatherDescription] || weatherIconMapping.default;

            // Vejrikon for vindhastighed
            const windIcon = 'assets/img/symboler/vind3.png';

            upcomingWeatherHTML += `
            <div class="upcomingHours time-divider">
                <p>${forecastTime}</p>
                <img src="${weatherIconSrc}" alt="${forecastWeatherDescription}" class="upcoming-weather-icon">
                <p>${forecastTemperature}°C</p>
                <img src="${windIcon}" alt="windIcon" style="transform: rotate(${forecastWindDirectionDegrees}deg);"> <!-- Vejrikon for vindhastighed -->
                <p>${forecastWindSpeed}</p> <!-- Vindhastighed uden decimaler -->
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
export function displayUpcomingDaysWeather(forecastData, iconSrc) {
    const upcomingDaysWeather = document.getElementById('upcomingDaysWeather');

    // Check if the 'upcomingDaysWeather' element exists
    if (upcomingDaysWeather) {
        // Initialize the HTML content with the title
        let upcomingDaysWeatherHTML = '';

        // Define an array of day names
        const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

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
                const forecastTemperature = forecast.main.temp.toFixed(0);
                const forecastWeatherDescription = forecast.weather[0].description.toLowerCase(); // Convert to lowercase

                // Determine the weather icon source based on forecastWeatherDescription
                const weatherIconSrc = weatherIconMapping[forecastWeatherDescription] || weatherIconMapping.default;

        // Create the HTML for the forecast entry
        const container = document.createElement('div');

// Set the innerHTML of the container to your HTML template
const forecastEntryHTML = `

        <div class="upcomingDays">
            <h4 class="upcomingDaysHeadline">${dayName}</h4><br>
            <img src="${weatherIconSrc}" alt="${forecastWeatherDescription}" class="upcoming-days-weather-icon"><br>
            <p class="upcomingDaysTemp">${forecastTemperature}°C</p>
        </div>
        
        <div class="orangebar"></div>`;

container.innerHTML = forecastEntryHTML;

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