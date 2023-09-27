const { createPolicy,editPolicy,destroy,show } = require('../controllers/privacyPolicyController')
const authenticateToken = require('../middleware/authApi')

const router = require('express').Router()

router.get('/show',authenticateToken,show)
router.post('/add',authenticateToken,createPolicy)
router.put('/update/:id',authenticateToken,editPolicy)
router.delete('/delete/:id',authenticateToken,destroy)

module.exports = router