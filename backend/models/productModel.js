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
    description:{
        type:String,
        required:[true, 'Please provide a description']
    },
    images:[
        {
            description:{
                type:String,
                required:[true, "Please provide an image"]
            },
            url:{
                type:String,
                required:[true, "Please provide an image"]
            }
        }
    ],
    reviews:[
        {
            name:{
                type:String
            },
            comment:{
                type:String
            }
        }
    ],
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

module.exports = mongoose.model('Product', productSch)