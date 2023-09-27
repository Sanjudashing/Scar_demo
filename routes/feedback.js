const { store, show } = require('../controllers/feedbackController')
const authenticateToken = require('../middleware/authApi')

const router = require('express').Router()

router.get('/',authenticateToken,show)
router.post('/add',authenticateToken,store)

module.exports = router