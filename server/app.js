require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 4000
let index = require('./routes/index')
let place = require('./routes/place')
let itinerary = require('./routes/itinerary')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(cors())

app.use('/', index)
app.use('/api/place', place)
app.use('/api/itinerary', itinerary)

let env = app.settings.env || 'prod'

let db_config = {
  // dev: 'mongodb://localhost/pegasus',
  prod: `mongodb://rumah360:${process.env.ATLAS_PASS}@room360-shard-00-00-g8m3k.mongodb.net:27017,room360-shard-00-01-g8m3k.mongodb.net:27017,room360-shard-00-02-g8m3k.mongodb.net:27017/pegasus?ssl=true&replicaSet=room360-shard-0&authSource=admin`
}

mongoose.connect(db_config[env],(err,res)=>{
  console.log(db_config[env])
  console.log(err?err:'Berhasil connect ke db '+db_config[env])
})

app.set('port', port)
app.listen(app.get('port'), () => {
  console.log('magic happen at port:',app.get('port'))
})

module.exports = app
