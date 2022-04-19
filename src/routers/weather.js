const express = require("express")
const forecast = require("../utils/forecast")
const geocode = require("../utils/geocode")

const router = new express.Router()

router.get('/weather', async (req, res) => {
    {!req.query.address ?  res.send({
        error: "You must provide a search term"
    })
    : geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        {error ? res.send({error})
        : forecast(latitude, longitude, (error, forecastData) => {
                {error ? res.send({error})
                : res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                    })
                }    
            })
        }
    })
    }
})

module.exports = router