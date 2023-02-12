const { Router } = require('express')

/***** Own Modules Requirement *****/
const { userLogin, userRegister } = require('../controllers/authController.js')

/**********************************/

const router = Router()

/* 
    * Method: GET
    * EndPoint: /auth/login
*/
router.get('/login', (req, res) => res.json({Message:"Login Route Is Fine"}))

/* 
    * Method: POST
    * EndPoint: /auth/login
*/
router.post('/login', userLogin)

/* 
    * Method: GET
    * EndPoint: /auth/register
*/
router.get('/register', (req, res) => res.json({Message:"Registration Route Is Fine"}))

/* 
    * Method: POST
    * EndPoint: /auth/register
*/
router.post('/register', userRegister)

module.exports = router