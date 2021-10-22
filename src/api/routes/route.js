const router = require('express').Router()
const auth = require('../auth/auth')

//* Auth Routes
router.post('/auth/local/register', auth.register)
router.post('/auth/local/login', auth.login)

module.exports = router
