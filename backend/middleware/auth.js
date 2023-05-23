const jwt = require('jsonwebtoken')

const isAuthorizedUser = ()=>{
    const { token } = req.cookies
    console.log(token)
}

module.exports = isAuthorizedUser