const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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
        unique:true,
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
        img:{
            data:Buffer,
            contentType:String
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre("save", async function(next){
    
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
}

//password reset

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

//password comparing method
userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User',userSchema)