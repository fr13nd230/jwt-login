const { Router } = require('express')

/***** Own Modules Requirement *****/
const { userLogout } = require('../controllers/authController.js')
const { Protect } = require('../lib/Protect.js')

/**********************************/

const router = Router()

/* 
    * Method: GET
    * EndPoint: /dashboard/
*/
router.get('/', Protect, (req, res) => res.json({ Message: "Dashboard is fine" }))

/* 
    * Method: POST
    * EndPoint: /dashboard/logout
*/
router.get('/logout', Protect, userLogout)

module.exports = router