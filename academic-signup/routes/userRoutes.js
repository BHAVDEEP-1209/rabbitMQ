const { userController } = require('../controller')
const router = require('express').Router()


router.post('/',userController.sign_up_user);

module.exports  = router