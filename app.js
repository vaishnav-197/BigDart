const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connect = require('./src/db/db')
// @Express App
const app = express()
const PORT = process.env.PORT || 3000
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

app.listen(PORT, () => {
  console.log('server started')
})
