const request = require('request')



const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia211bHRhbmkiLCJhIjoiY2t1MDRmenhtMHIwaTJ1bnpvYXp3ZmJudCJ9.OyK9ucUItCE26-D2O5uXOA'
  request({ url, json: true}, (error, {body}) => {
    if(error){
      callback('unable to connect to location services')      
    }else if(body.features.length === 0){
      callback(`unable to connect to location services`, undefined)
    } else{
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode