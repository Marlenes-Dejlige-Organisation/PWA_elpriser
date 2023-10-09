// location.js

const apiKey = 'd2ff6a023f11473d9533c806b6da6aba'; // OpenCage API key

export async function geocodeCity(cityName) {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        if (data.results.length === 0) {
            throw new Error('City not found');
        }
        const coordinates = {
            lat: data.results[0].geometry.lat,
            lon: data.results[0].geometry.lng
        };
        return coordinates;
    } catch (error) {
        throw error;
    }
}
