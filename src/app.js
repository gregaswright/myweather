// const path = require('path')
const express = require('express')
const cors = require('cors')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')
require('./db/mongoose')

const userRouter = require('./routers/user')
const cityRouter = require('./routers/city')
const weatherRouter = require('./routers/weather')

const app = express()

// console.log(__dirname)
// const publicDirPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirPath))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(cityRouter)
app.use(weatherRouter)


app.get('/home', cors(), async (req, res) => {
    res.send('Use this Site to get the weather')
})

// app.get('/weather', async (req, res) => {
//     {!req.query.address ?  res.send({
//         error: "You must provide a search term"
//     })
//     : geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
//         {error ? res.send({error})
//         : forecast(latitude, longitude, (error, forecastData) => {
//                 {error ? res.send({error})
//                 : res.send({
//                     forecast: forecastData,
//                     location,
//                     address: req.query.address
//                     })
//                 }    
//             })
//         }
//     })
//     }
// })



app.listen(3000, () => {
    console.log('Server is up on port 3000 -Weather-')
})