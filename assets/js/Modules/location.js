// location.js

const apiKey = 'AIzaSyA_UkKyRKopA1AB4chC_rPCnWoqS3pNKuo'; // Replace with your Google Geocoding API key

export async function geocodeCity(cityName) {
   const encodedCityName = encodeURIComponent(cityName); // Encode the city name for use in the URL
   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCityName}&key=${apiKey}`;
   
   // Log the constructed URL before making the fetch request
   console.log('Geocoding API URL:', apiUrl);

   try {
       const response = await fetch(apiUrl);

       if (!response.ok) {
           throw new Error('City not found');
       }

       const data = await response.json();

       if (data.status !== 'OK' || data.results.length === 0) {
           // Log the response to examine its content
           console.log('Geocoding API Response:', data);
           throw new Error('City not found');
       }

       const location = data.results[0].geometry.location;
       const coordinates = {
           lat: location.lat,
           lon: location.lng
       };

       return coordinates;
   } catch (error) {
       throw error;
   }
}
