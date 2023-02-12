const { Router } = require('express')

const router = Router()

/* 
    * Method: GET
    * EndPoint: /
*/
router.get('/', (req, res) => res.json({Message:"JWT login API"}))

module.exports = router