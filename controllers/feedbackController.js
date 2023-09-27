const User = require('../models').User
const Feedback = require('../models').Feedback
const Joi = require('joi')

const store = async (req,res) => {
    try {
        const id = req.user_id
        const schema = Joi.object({ comment: Joi.string().regex(/^[^\n]*$/).min(2).max(50).required() })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            comment
        } = req.body
        const feedbacks = {
            userId: id,
            comment
        }
        await Feedback.create(feedbacks)
        return res.status(201).json({ status: true,message: 'Successfully sent feedback' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show = async (req,res) => {
    try {
        const userId = req.user_id
        const feedbacks = await Feedback.findAll({
            where: { userId },
            include: [
                { model: User }
            ]
        })
        var feedbackList=[]

        for (let index = 0; index < feedbacks.length; index++) {
            const element = feedbacks[index];
            const username=element.User.name
            const comment=element.comment

            feedbackList.push({
                username,
                comment
            })  
        }
        return res.status(201).json({feedbackList})
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
module.exports = {
    store,
    show
}