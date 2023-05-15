const express = require("express")
const app = express()

//route imports
const productRouter = require("./routes/productRoutes")

//middleware
app.use(express.json())

//routes
app.use("/api/v1",productRouter)

module.exports = app