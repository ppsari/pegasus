require('dotenv').config()
const request = require("request")

let init = () => {
  getWifi('10','-6.220146','106.7535745')
}

const getToken = () => {
  let token = {
    method: 'POST',
    url: 'https://api.mainapi.net/token',
    headers: {
      'postman-token': '3d4d0e56-906f-7015-49db-84defd5e5899',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
      authorization: process.env.MAIN_AUTHORIZATION
    },
    form: { grant_type: 'client_credentials' }
  }

  return new Promise((resolve,reject) => {
    try {
      request(token, function (error, response, body) {
        if (error) reject(error)
        resolve(`Bearer ${JSON.parse(body).access_token}`)
      })
    } catch(ex) {reject(ex)}
  })
}

const getArcType = async () => {
  let token = await getToken()
  let arctype = {
    method: 'GET',
    url: 'https://api.mainapi.net/arcgis/0.0.2',
    headers: {
      'postman-token': '0d9f59e9-e159-2d1e-69aa-762f49693523',
      'cache-control': 'no-cache',
       accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      authorization: token
    }
  }

  await request(arctype, function (error, response, body) {
    body = JSON.parse(body)
    if (typeof body.layers !== 'undefined') {
      console.log(body.layers)
    }
  })
}

const getArcLocation = async(po_id, lat, lon) => {
  let token = await getToken()
  let arclocation = {
    method: 'GET',
    url: `https://api.mainapi.net/arcgis/0.0.2/${po_id}/query/1000?geometry=${lon},${lat}`,
    headers: {
      'postman-token': '0d9f59e9-e159-2d1e-69aa-762f49693523',
      'cache-control': 'no-cache',
       accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      authorization: token
    }
  }

  await request(arclocation, function (error, response, body) {
    body = JSON.parse(body)
    if (typeof body.features !== 'undefined') {
      body.features = body.features.map(feature => feature.geometry)
      console.log(body.features)
    }
  })
}

const sendMessage = async (phone, content) => {
  console.log('send Msg')
    let res = await getToken()
    let message = {
      method: 'POST',
      url: 'https://api.mainapi.net/smsnotification/1.0.0/messages',
      headers: {
        accept: 'application/json',
        authorization: res,
        'postman-token': '7b900d0c-7a31-2603-1cda-5f8187e653a3',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'client_credentials',
        msisdn: phone,
        content: content
      }
    }

    await request(message, function (error, response, body) {
      console.log(error)
      body = JSON.parse(body)
      if (body.status !== 'success') console.log('fail to send message')
    })

    // done()

}

const getWifi = async (radius,lat,lon) => {
  try {
    let res = await getToken()
    let wifi = {
      method: 'GET',
      url: 'https://api.mainapi.net/wifi.id-locator/0.0.1/%2A',
      qs: { radius: radius, lat: lat, lon: lon },
      headers: {
        'postman-token': '2a0147ff-4fe3-9130-06ad-eb4159659376',
        'cache-control': 'no-cache',
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        authorization: res
      }
    }

    request(wifi, function (error, response, body) {
      body = JSON.parse(body)
      if (typeof body.net.mainapi.fault !== 'undefined') console.log(body.net.mainapi.fault)
      //tambah buat show
    })
  } catch(ex) {console.log('tes');console.log(ex)}
}

// getArcType()
getArcLocation(3,'-6.2212663', '106.8171743')
// init()
module.exports = {
  getWifi,
  getArcType,
  getArcLocation,
  sendMessage
}
