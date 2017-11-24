const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itinerarySchema = new Schema({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  date: {
    start: Date,
    end: Date
  },
  tag: [String],
  budget: Number,
  currency: String,
  _place: [{type: Schema.Types.ObjectId, ref:'Place'}],
  _user: {type: Schema.Types.ObjectId, ref:'User'}
})
let Itinerary = mongoose.model('Itinerary',itinerarySchema)

module.exports = Itinerary