const express = require("express")
const app = express()
require('express-async-errors')
const errorMiddleware = require("./middleware/errMiddleware")
const cookieParser = require('cookie-parser')
const cors  = require('cors')
const path = require('path')


//route imports
const musicRouter = require("./routes/musicRoutes")
const userRouter = require("./routes/userRoutes")

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))

//routes
app.use("/api/v1", musicRouter)
app.use("/api/v1", userRouter)

//error handler middleware
app.use(errorMiddleware)

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

module.exports = app