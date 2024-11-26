const getLocation = async (latitude) => {
  const apiKey = "ed88ce515999437a8ca96553192af16e";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}&key=${apiKey}`;

  console.log("Request URL:", url); // Log the request URL for debugging

  try {
    const response = await fetch(url);
    console.log("Response Status:", response.status); // Log response status

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.results.length > 0) {
      const location = data.results[0].components;
      const city = location.city || location.town || location.village;
      const country = location.country;
      console.log(`${city}, ${country}`);
      
      return `${city}, ${country}`;
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return "Error fetching location";
  }
};



export default getLocation;