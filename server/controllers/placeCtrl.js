let Place = require('../models/place')

const getPlaces = (req, res) => {
  Place.find((err, places) => res.send(err? {err: err} : places))
}

const getPlace = (req, res) => {
  let id = req.params.id
  Place.findById(id, (err, place) => res.send(err? {err: err} : place))
}

const createPlace = (req, res) => {
  let place_dt = {}
  let location = {}
  let image = {}
  let detail = {}
  let price = {}
  let hour = {}

  if (typeof req.body.name !== 'undefined') place_dt.name = req.body.name
  if (typeof req.body.descr !== 'undefined') place_dt.descr = req.body.descr
  if (typeof req.body.currency !== 'undefined') place_dt.currency = req.body.currency
  if (typeof req.body.tag !== 'undefined') place_dt.tag = req.body.tag

  if (typeof req.body.loc_lng !== 'undefined') location.lng = req.body.loc_lng
  if (typeof req.body.loc_lat !== 'undefined') location.lat = req.body.loc_lat
  if (typeof req.body.loc_address !== 'undefined') location.address = req.body.loc_address

  if (typeof req.body.img_vr !== 'undefined') image.vr = req.body.img_vr
  if (typeof req.body.img_ar !== 'undefined') image.ar = req.body.img_ar
  if (typeof req.body.img_standard !== 'undefined') image.standard = req.body.img_standard

  if (typeof req.body.price_weekday !== 'undefined') price.weekday = req.body.price_weekday
  if (typeof req.body.price_weekend !== 'undefined') price.weekend = req.body.price_weekend
  if (typeof req.body.hour_is24 !== 'undefined') hour.is24 = req.body.hour_is24
  if (typeof req.body.hour_open !== 'undefined') hour.open = req.body.hour_open
  if (typeof req.body.detail_close !== 'undefined') detail.close = req.body.detail_close

  if (Object.keys(location).length > 0) place_dt.location = location
  if (Object.keys(image).length > 0) place_dt.image = image
  if (Object.keys(price).length > 0) detail.price = price
  if (Object.keys(hour).length > 0) detail.hour = hour
  if (Object.keys(detail).length > 0) place_dt.detail = detail

  let nplace = new Place(place_dt)
  nplace.save((err,s_place) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(s_place)
  })

}

const updatePlace = (req, res) => {
  let id = req.params.id
  Place.findById(id, (err, place) => {
    if (err) res.send({err:err})
    else if (place === null) res.send({err: 'Place not found'})
    else {
      let location = place.location || {}
      let image = place.image || {}
      let detail = place.detail || {}
      let price = place.detail.price || {}
      let hour = place.detail.hour || {}

      if (typeof req.body.name !== 'undefined') place.name = req.body.name
      if (typeof req.body.descr !== 'undefined') place.descr = req.body.descr
      if (typeof req.body.currency !== 'undefined') place.currency = req.body.currency
      if (typeof req.body.tag !== 'undefined') place.tag = req.body.tag

      if (typeof req.body.loc_lng !== 'undefined') location.lng = req.body.loc_lng
      if (typeof req.body.loc_lat !== 'undefined') location.lat = req.body.loc_lat
      if (typeof req.body.loc_address !== 'undefined') location.address = req.body.loc_address

      if (typeof req.body.img_vr !== 'undefined') image.vr = req.body.img_vr
      if (typeof req.body.img_ar !== 'undefined') image.ar = req.body.img_ar
      if (typeof req.body.img_standard !== 'undefined') image.standard = req.body.img_standard

      if (typeof req.body.price_weekday !== 'undefined') price.weekday = req.body.price_weekday
      if (typeof req.body.price_weekend !== 'undefined') price.weekend = req.body.price_weekend
      if (typeof req.body.hour_is24 !== 'undefined') hour.is24 = req.body.hour_is24
      if (typeof req.body.hour_open !== 'undefined') hour.open = req.body.hour_open
      if (typeof req.body.detail_close !== 'undefined') detail.close = req.body.detail_close

      if (Object.keys(location).length > 0) place.location = location
      if (Object.keys(image).length > 0) place.image = image
      if (Object.keys(price).length > 0) detail.price = price
      if (Object.keys(hour).length > 0) detail.hour = hour
      if (Object.keys(detail).length > 0) place.detail = detail

      place.save((err,s_place) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(s_place)
      })
    }
  })
}

const deletePlace = (req, res) => {
  let id = req.params.id
  Place.findById(id, (err, place) => {
    if (err) res.send({err:err})
    else if (place === null) res.send({err: 'Place not found'})
    else place.remove((err,d_place)=> res.send(err?{err:err} : d_place))
  })
}

module.exports = {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  getPlace
}