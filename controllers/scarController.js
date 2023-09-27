const Scar = require('../models').Scar;
const { SCAR_STATUS } = require('../models/scar')

const storeScar = async (req,res) => {
    try {
        const {
            name
        } = req.body
        const scar = {
            name,
            status: SCAR_STATUS.STATUS_ACTIVE
        }
        const scarDetails = await Scar.create(scar)
        return res.status(200).json({ status: true,data: scarDetails,message: 'Scar added successfully' })
    } catch(error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}

const show=async(req,res)=>{
    try {
        const scars=await Scar.findAll()
        if(scars==null){
            scars=[]
        }
        var showScar=[]
        for (let index = 0; index < scars.length; index++) {
            const element = scars[index];
            const scarName=element.name
            showScar.push({
                scarName
            })
        }
        return res.status(200).json({showScar})
    } catch (error) {
        return res.status(400).json({ status: false,message: error.message })
    }
}
module.exports = {
    storeScar,
    show
}