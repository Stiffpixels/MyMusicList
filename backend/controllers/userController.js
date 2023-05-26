const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEMail= require('../utils/sendEmail.js')
const crypto = require('crypto')

const registerUser = async (req,res)=>{
    const { name, email, password } = req.body

    const user = await User.create({name, email,password, avatar:{
        public_id:'sample id',
        url:'userpfpicurl'
    }})

    sendToken(user, 201, res)
}

const loginUser = async (req, res)=>{
    const { email, password } = req.body

    if(!(email && password)){
        throw new ErrorHandler('Please enter email and password', 400)
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new ErrorHandler('Invalid email or password')
    }
    const isPasswordMatched = user.comparePassword(password)

    if(!isPasswordMatched){
        throw new ErrorHandler('Invalid email or password')
    }

    sendToken(user, 200, res)

}

const logoutUser = async (req,res)=>{

    res.cookie('token', null, {expires: new Date(Date.now()), httpOnly:true})

    res.status(200).json({
        success:true,
        message:'logged out'
    })
}

 const forgotPassword = async (req, res)=>{
    const user = await User.findOne({ email:req.body.email})
    
    if(!user){
        throw new ErrorHandler("No user with that email", 404)
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message =`your password reset token :- \n\n ${resetPasswordUrl} if you have not made request to reset your password, please ignore it`
    try{
        sendEMail({
            email:user.email,
            subject:'Scentary perfumes password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:"A reset password link has been sent to your email id."
        })
    }catch(err){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave:false })
    }
    
 }

 const resetPassword = async (req, res)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire:{$gt:Date.now()}})

    if(!user){
        throw new ErrorHandler('Reset password token is invalid or is expired', 500)
    }

    if(req.body.password !== req.body.confirmPassword){
        throw new ErrorHandler('Both the Passwords entered do not match', 500)
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    
    await user.save({ validateBeforeSave:false })

    sendToken(user, 200, res)

 }

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword }