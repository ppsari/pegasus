let Itin = require('../models/itinerary')

const getItins = (req, res) => {
  Itin.find()
  .populate('_user _place')
  .exec((err, itins) => res.send(err? {err: err} : itins))
}

const getUserItins = (req, res) => {
  Itin.find({_user:req.params.uid})
  .populate('_user _place')
  .exec((err, itins) => res.send(err? {err: err} : itins))
}

const getItin = (req, res) => {
  let id = req.params.id
  Itin.findById(id)
  .populate('_user _place')
  .exec((err, itin) => res.send(err? {err: err} : itin))
}

const createItin = (req, res) => {
  let itin_dt = {}
  let date = {}

  if (typeof req.body.name !== 'undefined') itin_dt.name = req.body.name
  if (typeof req.body.budget !== 'undefined') itin_dt.budget = req.body.budget
  if (typeof req.body.currency !== 'undefined') itin_dt.currency = req.body.currency
  if (typeof req.body.date_start !== 'undefined') date.start = req.body.date_start
  if (typeof req.body.date_end !== 'undefined') date.end = req.body.date_end
  if (typeof req.body.tag !== 'undefined') itin_dt.tag = req.body.tag
  if (typeof req.body._user !== 'undefined') itin_dt._user = req.body._user
  if (typeof req.body._place !== 'undefined') itin_dt._place = req.body._place
  if (Object.keys(date).length > 0) itin_dt.date = date

  let nitin = new Itin(itin_dt)
  nitin.save((err,s_itin) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(s_itin)
  })

}

const addPlaceItin = (req, res) => {
  let id = req.query.id
  let pid = req.query.pid
  Itin.findById(id, (err, itin) => {
    if (err) res.send({err:err})
    else if (itin === null) res.send({err: 'Itinerary not found'})
    else {
      let places = itin._place
      places.push(pid)
      console.log(places)
      places = places.filter((v,i,a) => a.indexOf(v) == i)
      itin._place = places
      itin.save((err, a_itin) => res.send(err? {err:err} : a_itin) )
    }

  })
}

const deletePlaceItin = (req, res) => {
  let id = req.query.id
  let pid = req.query.pid
  Itin.findById(id, (err, itin) => {
    if (err) res.send({err:err})
    else if (itin === null) res.send({err: 'Itinerary not found'})
    else {
      let idx = itin._place.indexOf(pid)
      if (idx === -1) res.send({err:'Place not found'})
      else {
        itin._place.splice(idx,1)
        itin.save((err, d_itin) => res.send(err? {err:err} : d_itin) )
      }

    }

  })
}

const updateItin = (req, res) => {
  let id = req.params.id
  Itin.findById(id, (err, itin) => {
    if (err) res.send({err:err})
    else if (itin === null) res.send({err: 'Itinerary not found'})
    else {
      itin.date = itin.date || {}
      if (typeof req.body.name !== 'undefined') itin.name = req.body.name
      if (typeof req.body.budget !== 'undefined') itin.budget = req.body.budget
      if (typeof req.body.currency !== 'undefined') itin.currency = req.body.currency
      if (typeof req.body.date_start !== 'undefined') itin.date.start = req.body.date_start
      if (typeof req.body.date_end !== 'undefined') itin.date.end = req.body.date_end
      if (typeof req.body.tag !== 'undefined') itin.tag = req.body.tag
      if (typeof req.body._user !== 'undefined') itin._user = req.body._user
      if (typeof req.body._place !== 'undefined') itin._place = req.body._place

      itin.save((err,s_itin) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(s_itin)
      })
    }
  })
}

const deleteItin = (req, res) => {
  let id = req.params.id
  Itin.findById(id, (err, itin) => {
    if (err) res.send({err:err})
    else if (itin === null) res.send({err: 'Itinerary not found'})
    else itin.remove((err,d_itin)=> res.send(err?{err:err} : d_itin))
  })
}

module.exports = {
  getItins,
  getUserItins,
  createItin,
  updateItin,
  deleteItin,
  addPlaceItin,
  deletePlaceItin,
  getItin
}