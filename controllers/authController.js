const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var shortid = require('shortid');
const { STATUS } = require('../models/user')
const { authValidation } = require('../validation/authValidation')

const register = async (req,res) => {
    try {
        const {
            name,
            email,
            password,
            status
        } = req.body
        const result = authValidation(req.body)
        if(result.error) {
            return res.status(422).json({ status: false,message: result.error.message })
        }
        const checkEmail = await User.findOne({ where: { email: email } })
        if(checkEmail != undefined) {
            return res.status(422).json({ status: false,message: 'Email already exists!' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const referralCode = shortid.generate();

        const userData = {
            name,
            email,
            password: hashPassword,
            referral_code: referralCode,
            status: STATUS.STATUS_ACTIVE
        }
        const user = await User.create(userData)
        return res.status(201).json({ status: true,data: user,message: 'Register successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const login = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body

        const getUser = await User.findOne({ where: { email: email } })
        if(!getUser) {
            return res.status(400).json({ status: false,message: 'Please enter the correct credentials' })
        }
        const validatePassword = await bcrypt.compare(password,getUser.password)
        if(!validatePassword) {
            return res.status(400).json({ status: false,message: 'Please enter the correct credentials' })
        }
        const token = jwt.sign({ id: getUser.id },process.env.SECRET_KEY)
        return res.status(200).json({ status: true,data: { token },message: 'LoggedIn' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const referelFriend = async (req,res) => {
    try {
        const user = req.user_id;
        const data = await User.findOne({ user })
        if(!data) {
            return res.status(404).json({ status: false,message: 'User not found' })
        }
        var link = `${process.env.APP_URL}/loremipsum.com/scar/${data.referral_code}`
        return res.status(200).json({ status: true,link,message: 'Refer a friend' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const redemedCode = async (req,res) => {
    try {
        const {
            referral_code
        } = req.body
        const user = req.user_id;

        const referer = await User.findOne({ referral_code })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

module.exports = {
    register,
    login,
    referelFriend
}