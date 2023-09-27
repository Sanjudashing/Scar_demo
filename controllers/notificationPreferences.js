const NotificationPreferences = require('../models').NotificationPreferences
const ManageNotifications = require('../models').ManageNotifications
const { NOTIFICATION_STATUS } = require('../models/notificationpreferences')
const Joi = require('joi')


const store = async (req,res) => {
    try {
        const schema = Joi.object({
            description: Joi.string().regex(/^[^\n]*$/).required(),
            status: Joi.number().valid(...Object.values(NOTIFICATION_STATUS)).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            description,
            status
        } = req.body

        const notificationData = {
            description,
            status
        }
        await NotificationPreferences.create(notificationData)
        return res.status(200).json({ status: true,data: notificationData,message: 'Notification preferences added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const update = async (req,res) => {
    try {
        const id = req.params.id
        const notificatioonPref = await NotificationPreferences.findOne({ where: { id } })
        if(!notificatioonPref) {
            return res.status(404).json({ status: false,message: 'notification preferences not available' })
        }
        const schema = Joi.object({
            description: Joi.string().regex(/^[^\n]*$/).required(),
            status: Joi.number().valid(...Object.values(NOTIFICATION_STATUS)).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(403).json({ status: false,message: error.message })
        }
        const {
            description,
            status
        } = req.body

        const notificationData = {
            description,
            status
        }
        await NotificationPreferences.update(notificationData,{ where: { id } })
        return res.status(200).json({ status: true,data: notificationData,message: 'Notification preferences updated successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const destroy = async (req,res) => {
    try {
        const id = req.params.id;
        const notification = await NotificationPreferences.destroy({ where: { id: id } })
        if(!notification) {
            return res.status(404).json({ status: false,message: 'Notificaion preferences is not available' })
        }
        return res.status(200).json({ status: true,message: 'Deleted successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show = async (req,res) => {
    try {
        const active = await NotificationPreferences.findAll({
            where: { status: NOTIFICATION_STATUS.ACTIVE }
        })
        const notificationPreferenceList = []
        for(let index = 0; index < active.length; index++) {
            const element = active[index];
            const desc = element.description
            const status = element.status

            notificationPreferenceList.push({
                desc,
                status
            })
        }
        return res.status(200).json({ notificationPreferenceList })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

/*   Manage notifications  */

const addNotification = async (req,res) => {
    try {
        const userId = req.user_id
        const {
            notificationPrefId
        } = req.body

        const existingNotification = await ManageNotifications.findOne({
            where: {
                notificationPrefId: notificationPrefId
            }
        });
        if(existingNotification) {
            return res.status(400).json({ status: false,message: 'Notification already exists' });
        }

        const notification = await NotificationPreferences.findOne({
            where: {
                id: notificationPrefId,
                status: NOTIFICATION_STATUS.ACTIVE
            }
        })
        if(!notification) {
            return res.status(404).json({ status: false,message: 'Accept only for active notifications' })
        }
        const addData = {
            userId: userId,
            notificationPrefId
        }

        await ManageNotifications.create(addData)
        return res.status(200).json({ status: true,data: addData,message: 'Add notification successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const updateNotification = async (req,res) => {
    try {
        const id = req.params.id
        const userId = req.user_id
        const {
            notificationPrefId
        } = req.body
        const addData = {
            userId: userId,
            notificationPrefId
        }
        const notification = await NotificationPreferences.findByPk(notificationPrefId)
        if(!notification) {
            return res.status(404).json({ status: false,message: 'Notification was not found' })
        }
        await ManageNotifications.update(addData,{ where: { id } })
        return res.status(200).json({ status: true,data: addData,message: 'Notification update successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const deleteNotification = async (req,res) => {
    try {
        const id = req.params.id
        const notification = await ManageNotifications.destroy({ where: { id: id } })
        if(!notification) {
            return res.status(404).json({ status: false,message: 'Notification was not found' })
        }
        return res.status(200).json({ status: true,message: 'Deleted successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const showNotification = async (req,res) => {
    try {
        const notifications = await NotificationPreferences.findAll({
            where: {
                status: NOTIFICATION_STATUS.ACTIVE
            },
            attributes: ['description','status'],
            include: [
                {
                    model: ManageNotifications,
                    attributes: ['notificationPrefId']
                },
            ]
        })
        return res.send(notifications)
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

module.exports = {
    store,
    destroy,
    update,
    show,
    addNotification,
    updateNotification,
    deleteNotification,
    showNotification
}