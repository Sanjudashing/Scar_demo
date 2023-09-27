const { register,login,referelFriend } = require('../controllers/authController')
const { changePassword,updatePassword } = require('../controllers/forgetPasswordController')
const authenticateToken = require('../middleware/authApi')

const router = require('express').Router()

router.post('/change-password',changePassword)
router.post('/update-password/:token',updatePassword)
router.post('/register',register)
router.post('/login',login)
router.post('/referer',authenticateToken,referelFriend)


module.exports = router 