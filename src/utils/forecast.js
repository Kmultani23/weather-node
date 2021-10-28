const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48b183e30f1ed445913b0866834db347&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `the current location is ${body.location.name} and the temperature is ${body.current.temperature } degrees, it feels like ${body.current.feelslike} it's also ${body.current.weather_descriptions[0]}`)
        }
    })
}

module.exports = forecast