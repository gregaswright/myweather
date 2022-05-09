require('dotenv').config();
const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const whitelist = ["http://127.0.0.1", "http://127.0.0.1:63057"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not Allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

const userRouter = require('./routers/user')
const cityRouter = require('./routers/city')
const weatherRouter = require('./routers/weather')
const googlePlacesKeyRouter = require('./routers/google-places-key')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(cityRouter)
app.use(weatherRouter)
app.use(googlePlacesKeyRouter)

app.get('/home', cors(), async (req, res) => {
    res.send('Use this Site to get the weather')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000 -Weather-')
})