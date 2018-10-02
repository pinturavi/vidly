const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {title:"Vidly app", message: "Hello doods this is my first express app"})
})

module.exports=router