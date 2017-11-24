'use strict'
const express = require('express')
let router = express.Router()
const loginCtrl = require('../controllers/loginCtrl')

router.get('/', (req,res) => {res.send('alive')} )

router.post('/login',loginCtrl.login) //v
router.post('/register',loginCtrl.register) //
router.post('/seedUser',loginCtrl.seedUser) //v

module.exports = router