const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success:false,
            msg : 'Not Authorized'
        })
    }

    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success : false,
            msg : 'No Token Found, Try Loggin in'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload
        next()
    }
    catch(error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            msg : "Some Error Occurred",
            error
        })
    }
}

module.exports = authMiddleware