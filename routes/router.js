const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default:fetch})=> fetch(...args))

router.use(express.static('public'))

const xboxRoutes = require('./api/switchRoutes')

router.use('/games', xboxRoutes)

router.get('/', (req,res)=> {
    const URL ='https://api.sampleapis.com/switch/games'
    fetch(URL)
    .then(res=> res.json())
    .then(data => {
        res.render('pages/home', {
            title:'Home',
            name: 'Games',
            data
        })
    })
})

router.get('*', (req,res)=> {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 ERROR - page not found',
            name: '404 error'
        })
    }
})

module.exports = router