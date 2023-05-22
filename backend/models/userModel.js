const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

userSchema.pre("save", async function(){
    
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//JWT Token
userSchema.methods.getJWTTOken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
}

module.exports = mongoose.model('User',userSchema)