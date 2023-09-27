const { storeScar,show } = require('../controllers/scarController')
const { store,showJourney,showAchievement } = require('../controllers/scarJourneyController')
const authenticateToken = require('../middleware/authApi')
const upload = require('../middleware/multerConfig')

const router = require('express').Router()

router.get('/scar-journey/show-achievement',authenticateToken,showAchievement)
router.get('/scar-journey-details/:id',authenticateToken,showJourney)
router.post('/add-scar-journey',authenticateToken,upload.single("image"),store)
router.get('/scars',authenticateToken,show)
router.post('/add-scar',authenticateToken,storeScar)

module.exports = router