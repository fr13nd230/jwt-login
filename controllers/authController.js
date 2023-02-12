/*
    *Signature: Authentification Route Controller 
*/

const jwt = require('jsonwebtoken')

/***** Own Modules Requirement *****/
const User = require('../models/userModel.js')

/**********************************/

const createToken = async (id) => {
    return( jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: '1d' }) )
}

const userLogin = async (req, res) => {

    try {
        
        const { username, password } = req.body

        const user = await User.toLogin(username, password)

        const token = await createToken(user.id)

        res.status(200).json({
            Message: "User Logged In Successfully",
            user,
            token
        })

    } catch ( err ) {
        if ( err ) res.status(400).json({ Error: err.message })
    }

}

const userRegister = async (req, res) => {

    try {
        
        const { username, email, password } = req.body

        const user = await User.toRegister(username, email, password)

        const token = await createToken(user.id)

        req.cookies('jwt', token, { maxAge: 86400000 } )

        res.status(201).json({
            Message: "User Registered Successfully",
            user,
            token
        })

    } catch ( err ) {
        if ( err ) res.status(400).json({ Error: err.message })
    }

}

const userLogout = async (req, res) => {

    try {

        // These For You To Implement In The Front-End 

        res.status(200).json({
            Message: "User Logged Out Successfully"
        })

    } catch ( err ) {
        if ( err ) res.status(400).json({ Error: err.message })
    }

}

module.exports = {
    userLogin,
    userRegister,
    userLogout
}