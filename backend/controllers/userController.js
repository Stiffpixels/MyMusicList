const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')

const addUser = async (req,res)=>{
    const { name, email, password } = req.body

    const user = await User.create({name, email,password, avatar:{
        public_id:'sample id',
        url:'userpfpicurl'
    }})

    const token = user.getJWTToken()

    res.status(201).json({success:true, token})
}

module.exports = { addUser }