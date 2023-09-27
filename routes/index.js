const router = require('express').Router()
const user = require('./auth')
const scar = require('./scar')
const logbook = require('./logbook')
const news = require('./news')
const privacyPolicy = require('./privacy-policy')
const termsOfUse = require('./terms-of-use')
const feedback = require('./feedback')
const notificationPreferences = require('./notification-preference')

router.use('/user',user)
router.use('/scar',scar)
router.use('/logbook',logbook)
router.use('/news',news)
router.use('/privacy-policy',privacyPolicy)
router.use('/terms-of-use',termsOfUse)
router.use('/feedback',feedback)
router.use('/notification-pref',notificationPreferences)

module.exports = router