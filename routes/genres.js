const express = require('express')
const Joi = require('joi')
const router = express.Router()
const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: Sting,
        required: true,
        min: 5,
        max: 50
    }
}))

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'romantic' },
    { id: 3, name: 'thriller' },
    { id: 4, name: 'fictional' }
]

router.get('/', (req, res) => {
    const genres = await Genre.find().sort('name')
    if (!genre) return res.status(404).send(`No genres found`)
    res.send(genres)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.find().sort('name')
    if (!genre) return res.status(404).send(`No genre found with the id ${req.params.id}`)
    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    Genre.save()
    res.send(genre)
})

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`no genres available with the id ${req.params.id}`)
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`no genres found with the id ${req.params.id}`)
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router