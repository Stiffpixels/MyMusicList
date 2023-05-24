const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const isAuthorizedUser = async (req, res, next)=>{
    const { token } = req.cookies
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decodedData.id)
    next()
}

module.exports = isAuthorizedUser