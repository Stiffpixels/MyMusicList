const mongoose = require('mongoose')

const productSch = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name']
    },
    price:{
        type:Number,
        required:[true, 'Please provide a price']
    },
    rating:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    stock:{
        type:Boolean,
        default:true
    },
    category:{
        type:String,
        enum:{
            values:['attar', 'deodrant'],
            message:'{VALUE} is not available'
        }
    }
})

module.exports = mongoose.model('Peoduct', productSch)