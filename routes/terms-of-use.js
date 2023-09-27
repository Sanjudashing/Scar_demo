const {store, update, destroy, show}=require('../controllers/termsOfUseController')
const authenticateToken = require('../middleware/authApi')

const router=require('express').Router()

router.get('/all',authenticateToken,show)
router.post('/add',authenticateToken,store)
router.put('/edit/:id',authenticateToken,update)
router.delete('/delete/:id',authenticateToken,destroy)

module.exports=router