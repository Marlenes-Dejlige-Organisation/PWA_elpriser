const geocodingApiKey = 'YourGeocodingApiKey';

export async function geocodeCity(cityName, apiKey) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();

    if (data.status !== 'OK' || data.results.length === 0) {
      console.error('Geocoding failed. No results found.');
      return null;
    }

    // Extract the location coordinates from the response
    const location = data.results[0].geometry.location;

    // Return the coordinates (latitude and longitude)
    return { lat: location.lat, lon: location.lng };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function reverseGeocode(lat, lon, apiKey) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const data = await response.json();

    if (data.status !== 'OK' || data.results.length === 0) {
      console.error('Reverse geocoding failed. No results found.');
      return null;
    }

    // Extract city and country information from the response
    const results = data.results[0].address_components;
    let city = '';
    let country = '';

    for (const component of results) {
      if (component.types.includes('locality')) {
        city = component.long_name;
      } else if (component.types.includes('country')) {
        country = component.long_name;
      }
    }

    return { city, country };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}
