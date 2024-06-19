const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password) {
        throw new Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid')
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is weak not strong enough Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character and must be at least 8 characters long')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({ email, password: hashedPassword })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw new Error('All fields must be filled')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Password is incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)