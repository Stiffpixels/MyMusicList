const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        maxLength:[30, 'Name cannot exceed 30 characters'],
        minLength:[4, 'Name cannot be less than 30 characters long']
    },
    email:{
        type:String,
        required:[true, 'Please provide a email'],
        unoque:true,
        validator:[validator.isEmail, 'Please enter an Email'],
    },
    password:{
        type:String,
        required:[true, 'Please provide a [password]'],
        minLength:[8, 'Password should be atleast 8 characters long'],
        maxLength:[16, 'Password should not exceed 16 charcaters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:[true, "Please provide a public id"]
        },
        url:{
            type:String,
            required:[true, "Please provide an image"]
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

module.exports = mongoose.Model('User',userSchema)