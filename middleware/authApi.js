const User = require('../models').User
const jwt = require('jsonwebtoken')

async function authenticateToken(req,res,next) {
    try {
        const bearerHeader = req.headers['authorization']
        if(typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            const decodeToken = jwt.verify(token,process.env.SECRET_KEY)
            const user = await User.findOne({
                where: {
                    id: decodeToken.id
                }
            });
            if(user) {
                req.user_id = decodeToken.id;
                next();
            } else {
                return res.status(403).json({ error: 'Unauthorized!' })
            }
        } else {
            return res.status(401).json({ error: 'Unauthorized!' });
        }
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
}
module.exports = authenticateToken;