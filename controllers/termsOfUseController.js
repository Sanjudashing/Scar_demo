const TermsOfUse = require('../models').TermsOfUse
const Joi = require('joi')

const store = async (req,res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().regex(/^[A-Za-z0-9,/ ]*$/).required(),
            description: Joi.string().regex(/^[^\n]*$/).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            name,
            description
        } = req.body

        const termsData = {
            name,
            description,
        }
        await TermsOfUse.create(termsData)
        return res.status(200).json({ status: true,data: termsData,message: 'Terms and condition added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const update = async (req,res) => {
    try {
        const id = req.params.id
        const conditions = await TermsOfUse.findOne({ where: { id: id } })
        if(!conditions) {
            return res.status(404).json({ status: false,message: 'Terms and condition is not found' })
        }
        const schema = Joi.object({
            name: Joi.string().regex(/^[A-Za-z0-9,/ ]*$/).required(),
            description: Joi.string().regex(/^[^\n]*$/).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            name,
            description
        } = req.body

        const termsData = {
            name,
            description,
        }
        await TermsOfUse.update(termsData,{ where: { id: id } })
        return res.status(200).json({ status: true,data: termsData,message: 'Terms and condition updated successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const destroy = async (req,res) => {
    try {
        const id = req.params.id;
        const condition = await TermsOfUse.destroy({ where: { id: id } })
        if(!condition) {
            return res.status(404).json({ status: false,message: 'Terms and condition not available' })
        }
        return res.status(200).json({ status: true,message: 'Deleted successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show = async (req,res) => {
    try {
        const terms = await TermsOfUse.findAll({})
        const termsandcondition = []
        for(let index = 0; index < terms.length; index++) {
            const element = terms[index];
            const title = element.name
            const desc = element.description

            termsandcondition.push({
                title,
                desc
            })
        }
        return res.status(200).json({ message: 'All terms and conditions',termsandcondition })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
module.exports = {
    store,
    update,
    destroy,
    show
}