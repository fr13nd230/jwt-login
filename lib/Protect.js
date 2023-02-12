/* ** This Midlleware Aim To Protect The Route ** */

const jwt = require('jsonwebtoken')

/***** Own Modules Requirement *****/
const User = require('../models/userModel.js')

/**********************************/
const Protect = async (req, res, next) => {

    const auth = req.headers.authorization // Getting Bearer Token
    let token // Empty Token Here

    if ( auth && auth.startsWith('Bearer')){
        try {
        
            token = auth.split(' ')[1] // Defining The Token

            const decoded = await jwt.verify(token, process.env.JWTSECRET) // Verifying Signature

            req.user = User.findById(decoded.id).select("-password")

            next()

        } catch ( err ) {
            if ( err ) throw err 
            res.status(401).json( { Message: "Unauthorized, log in please" } )
        }
    }

    if ( !token ) {
        res.status(401).json( { Message: "Unauthorized, log in please" } )
    }

}

module.exports = { Protect }