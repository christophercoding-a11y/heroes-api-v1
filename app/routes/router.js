// localhost:3000
// step 1
const express = require('express')
const router = express.Router()
const port = process.env.port || 3000

// 2
router.use(express.static('public'))

const endpoints = ['hero', 'franchise', 'team', 'power', 'species']

// individual routes
// router.use('/api/hero', require('./api/heroRoutes'))
// router.use('/api/franchise', require('./api/franchiseRoutes'))
endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


// 3
// router.get(path, callback function)
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Home',
        name: 'My Hero Website'
    })
})

// step 1b
module.exports = router