const { store,showData,destroy,update } = require('../controllers/logbookController')
const authenticateToken = require('../middleware/authApi')
const upload = require('../middleware/multerConfig')

const router = require('express').Router()

router.get('/show-logbook-details/:id',authenticateToken,showData)
router.post('/add-logbook-details',authenticateToken,upload.array("myFile",5),store)
router.delete('/delete/:id',authenticateToken,destroy)
router.put('/update/:id',authenticateToken,upload.array("myFile",5),update)


module.exports = router