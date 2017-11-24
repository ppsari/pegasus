const mongoose = require('mongoose')
const Schema = mongoose.Schema

let placeSchema = new Schema({
  tag: {
    type : [String],
    lowercase: true,
    enum : {
      values: ['eat', 'historical', 'local'],
      message : `{PATH} should be [ eat | historical | local ]`
    },
    required: [true, `{PATH} must be filled`]
  },
  location:{
    lat: String,
    lng: String,
    address: String
  },
  name: String,
  descr: String,
  currency: String,
  image:{
    vr: [String],
    ar: [String],
    standard: String
  },
  detail: {
    price: {
      weekday: Number,
      weekend: Number
    },
    hour: {
      is24: Boolean,
      open: String
    },
    close: [Number] //0 = senin, 1 selasa
  }
})
let Place = mongoose.model('Place',placeSchema)

module.exports = Place