const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if(err) {
      callback(err, null);
    } else if(body) {
      
      callback(null, JSON.parse(body).ip);
    } else {
      console.log("Not working")
    }
  })
}

module.exports = { fetchMyIP };