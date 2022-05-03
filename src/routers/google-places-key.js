const express = require('express');
const router = new express.Router();

router.get('/google-places-key', async (req, res) => {
    try {
        const key = process.env.GOOGLE_PLACES_KEY
        res.send(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router