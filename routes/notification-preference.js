const { store,destroy,update,addNotification,updateNotification,deleteNotification,show, showNotification } = require('../controllers/notificationPreferences')

const authenticateToken = require('../middleware/authApi')

const router = require('express').Router()

router.get('/',authenticateToken,show)
router.post('/add',authenticateToken,store)
router.put('/update/:id',authenticateToken,update)
router.delete('/delete/:id',authenticateToken,destroy)

router.get('/show-notification',authenticateToken,showNotification)
router.post('/manage-notification',authenticateToken,addNotification)
router.put('/update-notification/:id',authenticateToken,updateNotification)
router.delete('/delete-notification/:id',authenticateToken,deleteNotification)

module.exports = router