const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if(error) {
    console.log("Error message: ", error);
    return;
  } else {
    console.log("This is the ip address: ", ip);
    return;
  }
})