const logger = require('./logger')
const authenticator = require('./authenticator')
const genres = require('./routes/genres')

const debug = require('debug')('app:startup')
const express = require('express')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const app = express()

app.set('view engine', 'pug')
//this is default setting
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)
app.use(authenticator)
app.use('/api/genres', genres)

if('development' === app.get('env')) {
    app.use(morgan('tiny'))
    debug('morgan enabled in development mode')
}

app.get('/', (req, res) => {
    res.render('index', {title:"Vidly app", message: "Hello doods this is my first express app"})
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started and listening at the port number ${PORT}`))