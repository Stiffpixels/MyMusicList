const mongoose = require('mongoose')

const musicSch = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name']
    },
    artist:{
        type:String,
        required:[true, 'Please provide a price']
    },
    description:{
        type:String,
        required:[true, 'Please provide a description']
    },
    album:{
      type:String,
      required:[true, 'Please provide an album name.']
    },
    image:[
        {
            description:{
                type:String,
                required:[true, "Please provide an image name"]
            },
            url:{
                type:String,
                required:[true, "Please provide an image"]
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        //required:true,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            rating:{
                type:Number,
                default:0
            },
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
    category:{
        type:String,
        required:[true, "PLease enter a category for the music"]
    }
})

module.exports = mongoose.model('music', musicSch)