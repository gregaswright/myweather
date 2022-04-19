const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    // console.log(req.header('Authorization').replace('Bearer ', ''));
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'blahblahblah')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.', e })
    }
}

module.exports = auth