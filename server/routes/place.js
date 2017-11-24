'use strict'
const express = require('express')
let router = express.Router()
const placeCtrl = require('../controllers/placeCtrl')

router.get('/',placeCtrl.getPlaces) //v
router.get('/:id',placeCtrl.getPlace) //v
router.post('/',placeCtrl.createPlace) //v
router.put('/:id',placeCtrl.updatePlace) //v
router.delete('/:id',placeCtrl.deletePlace) //v

module.exports = router