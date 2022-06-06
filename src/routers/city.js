const express = require('express');
const router = new express.Router();
const City = require('../models/city');
const auth = require('../middleware/auth');

router.post('/cities', auth, async (req, res) => {
    const city = new City({
        ...req.body,
        owner: req.user._id
    })

    try {
       await city.save()
       res.status(201).send(city)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/cities',auth ,async (req, res) => {
    console.log('GET cities', res)
    try {
        const cities = await City.find({owner: req.user._id})
        res.send(cities)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/cities/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const city = await City.findOneAndDelete({_id, owner: req.user._id})
    try {
        if (!city) {
            return res.status(404).send()
        }
        res.send(city)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router