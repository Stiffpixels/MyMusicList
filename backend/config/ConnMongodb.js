
const mongoose = require('mongoose')

const connDB = (MongoUri)=>{
  mongoose.connect(MongoUri)
}

module.exports = connDB