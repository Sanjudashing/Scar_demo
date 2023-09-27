const User = require('../models').User
const ResetPassword = require('../models').ResetPassword
const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcrypt')
const { STATUS } = require('../models/user')
const crypto = require('crypto')
const Joi = require('joi')

const changePassword = async (req,res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() })
        const { error } = schema.validate(req.body)
        const {
            email,
        } = req.body
        let user = await User.findOne({ where: { email: email,status: STATUS.STATUS_ACTIVE } })
        if(user == undefined || user == null) {
            return res.status(400).json({ status: false,message: 'Email not found' })
        }
        await ResetPassword.destroy({ where: { userId: user.id } })
        const expiration = new Date(Date.now() + 1 * 60 * 1000);

        let token = await ResetPassword.create({
            userId: user.id,
            token: crypto.randomBytes(32).toString("hex"),
            createdAt: Date.now(),
            expiresAt: expiration
        });
        var link = `${process.env.APP_URL}/password-reset/${user.id}/${token.token}`
        await sendEmail(user.email,"password reset",link);
        return res.status(200).json({ status: true,message: 'Password reset link sent to email account',link });
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const updatePassword = async (req,res) => {
    try {
        const token = req.params.token
        const {
            new_password,
            confirm_password
        } = req.body

        let passwordResetToken = await ResetPassword.findOne({ token })
        if(!passwordResetToken) {
            return res.status(400).json({ status: false,message: 'Invalid token' })
        }
        const now = new Date();
        if(now > passwordResetToken.expiresAt) {
            return res.status(400).json({ status: false,message: 'Token has expired' })
        }
        if(token !== passwordResetToken.token) {
            return res.status(400).json({ status: false,message: 'Tokens do not match' });
        }
        if(new_password !== confirm_password) {
            return res.status(400).json({ status: false,message: 'New password and confirm password do not match' });
        }
        
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(new_password,salt);

        await User.update(
            { password: hasedPassword },
            { where: { id: passwordResetToken.userId } }
        )
        await passwordResetToken.destroy();
        return res.status(200).json({ status: true,message: 'Password successfully changed' });
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
module.exports = {
    changePassword,
    updatePassword
}

