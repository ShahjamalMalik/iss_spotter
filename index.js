const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if(err) {
      callback(`This is the error message: ${err}`, null);
    } else if(body) {
      callback(null, body["ip"]);
    } else {
      console.log("Not working")
    }
  })
}



