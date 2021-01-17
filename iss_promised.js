const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  let ipAdd = JSON.parse(body);
  ipAdd = ipAdd.ip;
  return request(`https://freegeoip.app/json/${ipAdd}`)
};

const fetchISSFlyOverTimes = (body) => {
  let locationObj = {
    latitude: JSON.parse(body).latitude,
    longitude: JSON.parse(body).longitude
  }
  return request(`http://api.open-notify.org/iss-pass.json?lat=${locationObj.latitude}&lon=${locationObj.longitude}`)
}


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    
}

nextISSTimesForMyLocation();


module.exports = { nextISSTimesForMyLocation };