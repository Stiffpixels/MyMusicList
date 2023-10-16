const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')

const isAuthorizedUser = async (req, res, next)=>{
    const { token } = req.cookies

    if(!token){
        throw new ErrorHandler('Please login or register first', 500)
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decodedData.id)
    if(!req.user){
      throw new ErrorHandler('Please login or register first', 500)
    }
    next()
}

const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            throw new ErrorHandler(`The role ${req.user.role} does not have access to this resource`, 403)
        }
        next()
    }
}

module.exports = { isAuthorizedUser, authorizeRoles }