const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// @Express App
const app = express()

/*
    @Middlewares
*/

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

/*
    @Routes
*/

app.listen(3000, () => {
  console.log('server started')
})
