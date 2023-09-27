const { createNews,show,showNews,destroy,updateNews } = require('../controllers/newsController')

const authenticateToken = require('../middleware/authApi')

const router = require('express').Router()

router.get('/',authenticateToken,authenticateToken,show)
router.get('/all-news',authenticateToken,showNews)
router.post('/add-news',authenticateToken,createNews)
router.put('/edit-news/:id',authenticateToken,updateNews)
router.delete('/delete-news/:id',authenticateToken,destroy)


module.exports = router