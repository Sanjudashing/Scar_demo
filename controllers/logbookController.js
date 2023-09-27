const Logbook = require('../models').Logbook
const SatisfactionScore = require('../models').SatisfactionScore
const LogbookScarImage = require('../models').LogbookScarImage
const Feelings = require('../models').Feelings
const User = require('../models').User
const Symptoms = require('../models').Symptoms
const SymptomsLevel = require('../models').SymptomsLevel
const Scar = require('../models').Scar

const store = async (req,res) => {
    try {
        const userId = req.user_id;
        const {
            scarId,
            feelingsId,
            symptomsId,
            symptomsLevelId,
            length,
            depth,
            massageTimer,
        } = req.body
        const logbookData = {
            userId,
            scarId,
            feelingsId,
            length,
            depth,
            massageTimer
        }
        const feelings = await Feelings.findByPk(feelingsId)
        if(!feelings) {
            return res.status(400).json({ status: false,message: 'feeling not found' })
        }
        const scars=await Scar.findByPk(scarId)
        if(!scars){
            return res.status(400).json({status:false,message:'Scar not found'})
        }
        const scarImages = req.files;
        
        const createLogbook = await Logbook.create(logbookData)

        var scorData = []
        for(let index = 0; index < symptomsId.length; index++) {
            const obj = {
                logbookId: createLogbook.id,
                symptomsId: parseInt(symptomsId[index]),
                symptomsLevelId: parseInt(symptomsLevelId[index]),
            }
            scorData.push(obj)
        }
        const createSatisfactionScoreData = await SatisfactionScore.bulkCreate(scorData)

        var scarImage = [];
        for(let index = 0; index < scarImages.length; index++) {
            const obj = {
                logbookId: createLogbook.id,
                image: scarImages[index].filename
            }
            scarImage.push(obj)
        }
        const createData = await LogbookScarImage.bulkCreate(scarImage)
        return res.status(200).json({ status: true,message: 'Added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message });
    }
}

const update = async (req,res) => {
    try {
        const id = req.params.id
        const logbooks = await Logbook.findOne({ where: { id: id } })
        if(!logbooks) {
            return res.status(404).json({ status: false,message: 'Logbook not found' })
        }
        const deleteScore = await SatisfactionScore.destroy({ where: { logbookId: id } })
        const deleteScarImage = await LogbookScarImage.destroy({ where: { logbookId: id } })
        const userId = req.user_id;
        const {
            scarId,
            feelingsId,
            symptomsId,
            symptomsLevelId,
            length,
            depth,
            massageTimer,
        } = req.body
        const logbookData = {
            userId,
            scarId,
            feelingsId,
            length,
            depth,
            massageTimer
        }
        const scarImages = req.files;
        const feelings = await Feelings.findByPk(feelingsId)
        if(!feelings) {
            return res.status(400).json({ status: false,message: 'feeling not found' })
        }

        const createLogbook = await Logbook.update(logbookData,{ where: { id: id } })

        var scorData = []
        for(let index = 0; index < symptomsId.length; index++) {
            const obj = {
                logbookId: id,
                symptomsId: parseInt(symptomsId[index]),
                symptomsLevelId: parseInt(symptomsLevelId[index]),
            }
            scorData.push(obj)
        }
        const createSatisfactionScoreData = await SatisfactionScore.bulkCreate(scorData,{ where: { logbookId: id } })

        var scarImage = [];
        for(let index = 0; index < scarImages.length; index++) {
            const obj = {
                logbookId: id,
                image: scarImages[index].filename
            }
            scarImage.push(obj)
        }
        const createData = await LogbookScarImage.bulkCreate(scarImage,{ where: { logbookId: id } })

    } catch(error) {
        return res.status(400).json({ status: false,message: error.message });
    }
}

const destroy = async (req,res) => {
    try {
        const id = req.params.id
        const logbooks = await Logbook.findOne({ where: { id: id } })
        if(!logbooks) {
            return res.status(404).json({ status: false,message: 'Logbook data not found' })
        }
        await Logbook.destroy({ where: { id: id } })
        await SatisfactionScore.destroy({ where: { logbookId: id } })
        await LogbookScarImage.destroy({ where: { logbookId: id } })
        return res.status(200).json({ status: true,message: 'Logbook data delete successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message });
    }
}


const showData = async (req,res) => {
    try {
        const userId = req.params.id
        const logbookData = await SatisfactionScore.findAll({
            where: { userId: userId },
            include: [
                { model: User },
                { model: Feelings },
                { model: Symptoms },
                { model: SymptomsLevel },
                { model: Scar },
            ]
        })

        var logbookDetails = []
        for(let index = 0; index < logbookData.length; index++) {
            const element = logbookData[index];
            const uname = element.User.name
            const scar = element.Scar.name
            const feelings = element.Feeling.name
            const symptom = element.Symptom.name
            const symLevel = element.SymptomsLevel.name

            logbookDetails.push({
                uname,
                scar,
                feelings,
                symptom,
                symLevel,

            })
        }
        return res.status(201).json({ status: true,data: logbookDetails })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message });
    }
}
module.exports = {
    store,
    destroy,
    showData,
    update
}


// const {
//     feelingId,
//     scarId,
//     length,
//     depth,
//     massageTimer,
//     symptomsId,
//     symptomsLevelId,
// }=req.body

// const logbookData={
//     length,
//     depth,
//     feelingId,
//     scarId,
//     massageTimer
// }
// const createLogbook=await Logbook.create(logbookData)

// var data=[];

// for (let index = 0; index <symptomsId.length; index++) {
//     const obj={
//         scarId:parseInt(scarId[index]),
//         feelingsId:parseInt(feelingId[index]),
//         symptomsId:parseInt(symptomsId[index]),
//         symptomsLevelId:parseInt(symptomsLevelId[index]),

//     }
//     data.push(obj)
// }