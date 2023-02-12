const { connect, set } = require('mongoose')

const Connect = async (uri) => {

    const options = {
        'useUnifiedTopology': true,
        'useNewUrlParser': true
    }

    set(`strictQuery`, true)

    try {

        // Trying to connect
        const con = await connect(uri, options)

        if ( !con ) {
            console.log(`[DATABASE]: Connection Failed`)
        }

        console.log(`[DATABASE]: Connection Succeeded`)

    } catch ( err ) {
        if ( err ) throw err
    } 

}

module.exports = { Connect }