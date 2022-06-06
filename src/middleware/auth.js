const { decode } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        console.log('token', token);
        const decoded = jwt.verify(token, 'blahblahblah')
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user);
        
        if (!user) {
            console.log('error')
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        // console.log("401")
        res.status(401).send({ error: 'Please authenticate.', e })
    }
}

module.exports = auth