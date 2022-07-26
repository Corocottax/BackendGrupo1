const jwt = require('jsonwebtoken')

const generateSign = (id, userName) => {

    return jwt.sign({ id, userName }, process.env.JWT_SECRET, { expiresIn: '30d' })

}

const verifyJwt = (token) => {

    return jwt.verify(token, process.env.JWT_SECRET)
    
}

module.exports = { generateSign, verifyJwt }