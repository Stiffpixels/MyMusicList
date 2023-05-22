const express = require("express")
const app = express()
require('express-async-errors')
const errorMiddleware = require("./middleware/errMiddleware")

//route imports
const productRouter = require("./routes/productRoutes")
const userRouter = require("./routes/userRoutes")

//middleware
app.use(express.json())

//routes
app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)

//error handler middleware
app.use(errorMiddleware)

module.exports = app