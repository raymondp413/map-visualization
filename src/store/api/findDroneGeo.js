import "isomorphic-fetch";

const findDroneGeo = async (latitude, longitude) => {
  // Using the create-react-app's proxy for CORS issues
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBN4iw85nPUhpiOseyChL8vN6e2FTD1GHg`
  );
  if (!response.status) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return { data: json };
};

export default findDroneGeo;
