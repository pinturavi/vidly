const mongoose = requrie('mongoose')
const logger = require('./middleware/logger')
const authenticator = require('./middleware/authenticator')
const genres = require('./routes/genres')
const home = require('./routes/welcome')

const debug = require('debug')('app:startup')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const app = express()

mongoose.connect('mongodb://localhose/vidly', { useNewUrlParser: true })
    .then(() => console.log('connected to mongo db.'))
    .catch(error => console.log(error.message))

app.set('view engine', 'pug')
//this is default setting
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)
app.use(authenticator)
app.use('/api/genres', genres)
app.use('/', welcome)

if ('development' === app.get('env')) {
    app.use(morgan('tiny'))
    debug('morgan enabled in development mode')
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started and listening at the port number ${PORT}`))