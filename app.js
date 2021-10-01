const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connect = require('./src/db/db')
// @Express App
const app = express()

/*
    @Middlewares
*/

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

/*
  @MongoDB
*/
connect()

/*
    @Routes
*/

app.listen(3000, () => {
  console.log('server started')
})
