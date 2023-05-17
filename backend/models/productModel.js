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
        type:Number,
        default:50
    },
    category:{
        type:String,
        enum:{
            values:['attar', 'deodorant', 'perfume'],
            message:'{VALUE} is not available'
        },
        required:[true, "PLease enter a category for the product"]
    }
})

module.exports = mongoose.model('Product', productSch)