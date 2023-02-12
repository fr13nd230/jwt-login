const { model , Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({

    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: false
})

// Defining Own Authentification Logic Here
userSchema.statics.toRegister = async function(username, email, password) {

    try {
        
        const findByUsername = await this.findOne({ userName: username })

        //First Part: Validations Part
        if ( !username || !email || !password ) {
            throw Error('All fields must be filled')
        }
        if ( !validator.isEmail(email) ) {
            throw Error('E-mail is not in valid format')
        }
        if ( !validator.isStrongPassword(password) ) {
            throw Error('Password must be stronger than that')
        }

        if ( username.length < 3 || username.length > 10 ) {
            throw Error('Username must be between 3-10 characters')
        }

        if ( findByUsername ) {
            throw Error('Username already in use')
        }

        //Second Part: Logical Part

        const salt = await bcrypt.genSalt(15)
        const hashedPass = await bcrypt.hash(password, salt)

        const user = await this.create({
            userName: username,
            email,
            password: hashedPass
        })

        return user

    } catch ( err ) {
        if ( err ) throw err
    }

}

userSchema.statics.toLogin = async function(username, password) {
    try {
        
        const user = await this.findOne({ userName: username })

        //First Part: Validations Part
        if ( !username || !password ) {
            throw Error('All fields must be filled')
        }

        if ( username.length < 3 || username.length > 10 ) {
            throw Error('Username must be between 3-10 characters')
        }

        if ( !user ) {
            throw Error('User does not exist')
        }

        //Second Part: Logical Part

        const isAuth = await bcrypt.compare(password, user.password)

        if ( !isAuth ) {
            throw Error('Wrong password')
        }

        return user

    } catch ( err ) {
        if ( err ) throw err
    }
}

module.exports = model('User', userSchema)