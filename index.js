const { fetchMyIP, fetchCoordsByIP } = require('./iss');


/*fetchMyIP((error, ip) => {
  if(error) {
    console.log("Error message: ", error);
    return;
  } else {
    console.log("This is the ip address: ", ip);
    return ip;
  }
})*/







fetchCoordsByIP('24.141.61.57', (error, locationObj) => {

  if(error) {
    console.log("Error message: ", error);
    return;
  } 
  console.log(`This is the latitude: ${locationObj.latitude} and this is the longitude: ${locationObj.longitude}`);
})