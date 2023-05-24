const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

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

module.exports = { registerUser, loginUser, logoutUser }