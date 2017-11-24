'use strict'
const express = require('express')
let router = express.Router()
const itineraryCtrl = require('../controllers/itineraryCtrl')

router.get('/user/:uid',itineraryCtrl.getUserItins) //v
router.get('/',itineraryCtrl.getItins) //v
router.get('/:id',itineraryCtrl.getItin) //v
router.post('/',itineraryCtrl.createItin) //v
router.post('/place',itineraryCtrl.addPlaceItin) //v
router.delete('/place',itineraryCtrl.deletePlaceItin) //v
router.put('/:id',itineraryCtrl.updateItin) //v
router.delete('/:id',itineraryCtrl.deleteItin) //v

module.exports = router