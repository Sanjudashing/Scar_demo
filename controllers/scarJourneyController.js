const ScarJourney = require('../models').ScarJourney
const Scar = require('../models').Scar
const { Op } = require("sequelize");
const Achievements = require('../models').Achievements
const { STATUS } = require('../models/achievements')

const store = async (req,res) => {
    try {
        if(!req.file)
            return res.status(400).json({ status: false,message: "you didn't upload image (jpeg OR png)" })
        const {
            scarId,
            userId
        } = req.body
        const scardetails = {
            scarId,
            userId,
            scarImage: req.file.originalname,
        }
        const getScar = await Scar.findByPk(scarId)
        if(!getScar) {
            return res.status(400).json({ status: false,message: 'Scar not found' })
        }
        const journeydetails = await ScarJourney.create(scardetails)
        return res.status(200).json({ status: true,data: journeydetails,message: 'Scar journey added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const showJourney = async (req,res) => {
    try {
        const scarId = req.params.id;
        const showJourney = await ScarJourney.findAll({
            where: { scarId: scarId },
            include: [{
                model: Scar
            }]
        })
        var formattedScarJourney = []

        for(let index = 0; index < showJourney.length; index++) {
            let element = showJourney[index];
            let id = element.id
            let create = element.createdAt
            let image = element.scarImage

            let imagePath = `${process.cwd()}/public/files/${image}`
            formattedScarJourney.push({
                id,
                create,
                image: imagePath
            })
        }
        return res.status(200).json({ status: true,data: formattedScarJourney,message: 'Scar journey details' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const showAchievement = async (req,res) => {
    try {
        const userId = req.user_id;
        const scar = await ScarJourney.findOne({
            order: [
                ['createdAt','ASC']
            ]
        })
        const createDate = new Date(scar.createdAt);

        const scarRecords = await ScarJourney.findAll({
            where: {
                id: { [Op.not]: scar.id },
            },
        });

        for(let index = 0; index < scarRecords.length; index++) {
            const journey = scarRecords[index];
            const id = journey.id
            const journeyCreateDate = journey.createdAt
            const Difference_In_Time = journeyCreateDate - createDate
            const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 60 * 60 * 24))

            let customMessage = '';

            const numberOfWeeks = Math.ceil(Difference_In_Days / 7);
            if(Difference_In_Days <= 14) {
                customMessage = `ScarBlue- use your logbook at least once a week for ${numberOfWeeks}week`
            } else if(Difference_In_Days <= 21) {
                customMessage = `ScarBronze- use your logbook at least once a week for ${numberOfWeeks}week`
            } else if(Difference_In_Days <= 28) {
                customMessage = `ScarSilver- use your logbook at least once a week for ${numberOfWeeks}week`
            }

            const existingAchievement = await Achievements.findOne({
                where: {
                    weeks: numberOfWeeks,
                    userId: userId,
                    scarId: id,
                }
            })

            if(customMessage && !existingAchievement) {
                const achievements = await Achievements.create({
                    userId,
                    scarId: id,
                    message: customMessage,
                    weeks: numberOfWeeks,
                    status: STATUS.isSent
                })
            }
        }

        const totalAchievements = await Achievements.findAll({})
        let scarWithCustomMessages = []
        for(let index = 0; index < totalAchievements.length; index++) {
            const element = totalAchievements[index];
            const showMessage = element.message

            scarWithCustomMessages.push({
                showMessage,
            })
        }
        return res.json({ data: scarWithCustomMessages })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
module.exports = {
    store,
    showJourney,
    showAchievement
}