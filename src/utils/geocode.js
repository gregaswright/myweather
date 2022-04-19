const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2VzbGltIiwiYSI6ImNrdWhjZ2JpczB1dHYydXJ1dGE0cGlua3kifQ.fkQQzs4xJx81-MISrKXPlg&limit=1`
    request({url, json: true}, (error, {body}) => {
        {
            error ? callback('Unable to connect to location services', undefined) 
            : body.features.length === 0 ? callback('Unable to find location. Try another search', undefined) 
            : callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            }) 
        }
    })
}

module.exports = geocode