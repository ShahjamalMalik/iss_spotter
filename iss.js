const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if(err) {
      callback(err, null);
      return;
    } else if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, JSON.parse(body).ip);
      return;
    }
  })
}

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {
    let jsonBody = JSON.parse(body);
    let locationObj = {
      latitude: jsonBody.latitude,
      longitude: jsonBody.longitude
    };
    if(err) {
      callback(err, null);
      return;
    } else if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, locationObj);
      return;
    }
  })
}

const fetchISSFlyOverTimes = (locationObj, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${locationObj.latitude}&lon=${locationObj.longitude}`, (err, response, body) => {
    const jsonBody = JSON.parse(body);
    if(err) {
      callback(err, null);
      return;
    } else if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      return;
    } else {
      callback(null, jsonBody.response)
      return;
    }
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, nextPasses);
      });
    });
  });
};






module.exports = {  nextISSTimesForMyLocation };

