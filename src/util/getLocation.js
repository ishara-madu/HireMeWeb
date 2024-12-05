const apiKey = "ed88ce515999437a8ca96553192af16e";

export const getSuggestions = async (query) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${query}&limit=6`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results; 
}

export const getCoordinatesFromLocation = async (location) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${location}&no_annotations=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length > 0) {
    const result = data.results[0];
    return {
      location: result.formatted, 
      coordinates: {
        lat: result.geometry.lat,   // Latitude
        lng: result.geometry.lng    // Longitude
      }
    };
  } else {
    throw new Error('Location not found');
  }
}

// Function to get formatted location from coordinates
export const getFormattedLocationFromCoordinates = async (coordinates) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates}&key=${apiKey}&no_annotations=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length > 0) {
    const result = data.results[0];

    
    return {
      formattedAddress: `${result.components._normalized_city},${result.components.state},${result.components.country}`,  
      coordinates: {
        lat: result.geometry.lat,         // Latitude
        lng: result.geometry.lng          // Longitude
      }
    };
  } else {
    throw new Error('No location found for the given coordinates');
  }
}
