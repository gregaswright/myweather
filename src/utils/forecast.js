const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${longitude},%20${latitude}&units=f`
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        {
            error ? callback('Unable to connect to weather services', undefined) 
            : body.error ? callback('Unable to find location. Try another search', undefined) 
            : callback(undefined, {
                place: body.current
            }) 
        }
    })
}

module.exports = forecast