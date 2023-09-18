const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"
    console.log(err)
    if(err.name==="CastError"){
        const message = `resource not found, Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000){
        console.log(err.keyValue);
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err
    })
}