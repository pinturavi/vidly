const logger = require('./logger')
const authenticator = require('./authenticator')

const express = require('express')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))
app.use(logger)
app.use(authenticator)

const genres = [
    {id:1, name:'action'},
    {id:2, name:'romantic'},
    {id:3, name:'thriller'}, 
    {id:4, name:'fictional'}
]

app.get('/', (req, res) => {
    res.send('welcome to home page of vidly')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send(`No genre found with the id ${req.params.id}`)
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const genre = {
        id : genres.length+1,
        name : req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send(`no genres available with the id ${req.params.id}`)
    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send(`no genres found with the id ${req.params.id}`)
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

const validateGenre = (genre) => {
    const schema = {
        name:Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started and listening at the port number ${PORT}`))