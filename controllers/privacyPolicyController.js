const PrivacyPolicy = require('../models').PrivacyPolicy
const Joi = require('joi')

const createPolicy = async (req,res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().regex(/^[A-Za-z\s]+$/).required(),
            description: Joi.string().regex(/^[A-Za-z\s]+$/).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            title,
            description
        } = req.body

        const newsData = {
            title,
            description,
        }
        await PrivacyPolicy.create(newsData)
        return res.status(200).json({ status: true,data: newsData,message: 'News added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const editPolicy = async (req,res) => {
    try {
        const id = req.params.id
        const policy = await PrivacyPolicy.findOne({ where: { id: id } })
        if(!policy) {
            return res.status(404).json({ status: false,message: 'Policy not found' })
        }
        const schema = Joi.object({
            title: Joi.string().regex(/^[A-Za-z\s]+$/).required(),
            description: Joi.string().regex(/^[A-Za-z\s]+$/).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            title,
            description
        } = req.body

        const policyData = {
            title,
            description,
        }
        await PrivacyPolicy.update(policyData,{ where: { id: id } })
        return res.status(200).json({ status: true,data: policyData,message: 'Privacy policy updated successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const destroy = async (req,res) => {
    try {
        const id = req.params.id;
        const policy = await PrivacyPolicy.destroy({ where: { id: id } })
        if(!policy) {
            return res.status(404).json({ status: false,message: 'Privacy policy was not found' })
        }
        return res.status(201).json({ status: true,message: 'Policy deleted successfully' });
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show = async (req,res) => {
    try {
        const policy = await PrivacyPolicy.findAll({})
        if(policy==null){
            policy=[]
        }
        var formatPolicy=[]
        for (let index = 0; index < policy.length; index++) {
            const element = policy[index];
            const title=element.title
            const description=element.description  

            formatPolicy.push({
                title,
                description
            })
        }
        return res.status(200).json({status:true,data:formatPolicy,message:'Show privacy policy'})
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

module.exports = {
    createPolicy,
    editPolicy,
    destroy,
    show
}