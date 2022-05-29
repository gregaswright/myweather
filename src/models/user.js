const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const City = require('./city')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.includes("password")) {
                throw new Error('Should not include password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true 
        }
    }]
}, {
    timestamps: true,
})

userSchema.virtual('city', {
    ref: 'City',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'blahblahblah')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.checkEmailTaken = async (email) => {
    const user = await User.findOne({ email })
    if (user) {
        throw new Error('Account already Exists')
    }
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.statics.findByToken = async (token) => {
    const user = await User.findOne({token})
    if (!user) {
        throw new Error('no one is logged in')
    } else if (user) {
        return user
    }
}

// Hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete user tasks when user is removed 
userSchema.pre('remove', async function (next) {
    const user = this
    await City.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User