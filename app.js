const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connect = require('./src/db/db')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./src/api/routes/route')
// @Express App
const app = express()
const PORT = process.env.PORT || 3000
/*
    @Middlewares
*/
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

/*
  @MongoDB
*/
connect()

/*
    @Routes
*/
app.get('/', (req, res) => {
  res.status(400).send({
    msg: 'Server is up and running'
  })
})

app.use('/api/', routes)

app.listen(PORT, () => {
  console.log('server started , localhost:3000')
})
