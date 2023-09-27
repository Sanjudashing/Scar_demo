const News = require('../models').News
const Joi = require('joi')
const { NEWS_STATUS } = require('../models/news')
const { Op } = require('sequelize');

const createNews = async (req,res) => {
    try {
        const schema = Joi.object({
            newsName: Joi.string().regex(/^[A-Za-z0-9]*$/).min(2).max(100).required(),
            newsDetails: Joi.string().regex(/^[\w\s,.'!?()@#$%^&*+=_-]+$/).min(2).max(100).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            newsName,
            newsDetails
        } = req.body

        const newsData = {
            newsName,
            newsDetails,
            status: NEWS_STATUS.ACTIVE
        }
        await News.create(newsData)
        return res.status(200).json({ status: true,data: newsData,message: 'News added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const updateNews = async (req,res) => {
    try {
        const id = req.params.id
        const news = await News.findOne({ where: { id: id } })
        if(!news) {
            return res.status(404).json({ status: false,message: 'News not found' })
        }
        const schema = Joi.object({
            newsName: Joi.string().regex(/^[A-Za-z0-9]*$/).min(2).max(100).required(),
            newsDetails: Joi.string().regex(/^[\w\s,.'!?()@#$%^&*+=_-]+$/).min(2).max(100).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            newsName,
            newsDetails
        } = req.body

        const newsData = {
            newsName,
            newsDetails
        }
        await News.update(newsData,{ where: { id: id } })
        return res.status(200).json({ status: true,message: 'News updated successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
const destroy = async (req,res) => {
    try {
        const id = req.params.id;
        const news = await News.destroy({ where: { id: id } })
        if(!news) {
            return res.status(404).json({ status: false,message: 'News was not found' })
        }
        return res.status(201).json({ status: true,message: 'News deleted successfully' });
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show = async (req,res) => {
    try {
        const filters = req.query

        const options = {
            where: {
                [Op.or]: [
                    {
                        newsName: {
                            [Op.like]: `%${filters.newsName}%`
                        },
                    },
                    {
                        newsDetails: {
                            [Op.like]: `%${filters.newsDetails}%`
                        }
                    }
                ]
            },
        };
        var formattedNews = [];
        const filterData = await News.findAll(options);
        for(const news in filterData) {
            var name = filterData[news].newsName
            var details = filterData[news].newsDetails

            formattedNews.push({
                name,
                details
            })
        }
        return res.status(200).json({ data: formattedNews })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const showNews = async (req,res) => {
    try {
        const news = await News.findAll({})
        if(news == null) {
            news = []
        }

        const formattedDetails=[]
        for(let index = 0; index < news.length; index++) {
            const element = news[index];
            const title = element.newsName
            const details = element.newsDetails
            const create=element.createdAt.toISOString().split('T')[0]
            formattedDetails.push({
                title,
                details,
                create
            })
        }
        return res.status(200).json({ status: true,data: formattedDetails,message: 'All news' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

module.exports = {
    createNews,
    show,
    showNews,
    destroy,
    updateNews
}