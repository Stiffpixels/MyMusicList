const app = require("./app")
const dotenv = require('dotenv')
const connDB = require('./config/ConnMongodb.js')
dotenv.config({path:'backend/config/config.env'})

const port = process.env.PORT || 3000

const start = async ()=>{
    try {
        await connDB(process.env.MONGO_URI)
        app.listen(port, ()=>console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()
