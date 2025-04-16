// localhost:3000
// step 1
const express = require('express')
const router = express.Router()
const axios = require('axios')
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

// heroAside data
let heroAsideData = []

axios.get(`http://localhost:${port}/api/hero/sort`)
.then(resp => heroAsideData = resp.data)




// 3
// router.get(path, callback function)
router.get('/', (req, res)=> {

    let randomHero = {}
    let message = ''
    const url = `http://localhost:${port}/api/hero`

    axios.get(url)
    .then(resp => {
        randomHero = resp.data[Math.floor(Math.random() * resp.data.length)]

        let heroName = randomHero.hero_name != null ? randomHero.hero_name : `${randomHero.first_name} ${randomHero.last_name}`

        switch (randomHero.alignment) {
            case 'HERO':
                message = `Great news! ${heroName} is here to save you!`
                break;
            case 'ANTIHERO':
                message = `I guess you need to get on ${heroName}'s good side if you want to live.`
                break;
            case 'VILLAIN':
                message = `Looks like ${heroName} is here to destroy you and everything you love`
                break;
            default:
                message = ''
                break;
        }

        // console.log(message)
        // console.log(randomHero)
        res.render('pages/home', {
            title: 'Home',
            name: 'My Hero Website',
            randomHero,
            message,
            heroName
        })
    })

})

//hero page
router.get('/heroes', (req, res)=> {

    const url = `http://localhost:${port}/api/hero`

    axios.get(url)
    .then(resp => {
        res.render('pages/hero', {
            title: 'All Heroes',
            name: 'Heroes',
            data: resp.data,
            asideData: heroAsideData
        })
    })
})

// hero single
router.get('/heroes/:id', (req, res)=> {
    const id = req.params.id
    let heroPowers = []
    const url = `http://localhost:${port}/api/hero/${id}`

    const powerUrl = `http://localhost:${port}/api/hero/${id}/power`

    axios.get(powerUrl)
    .then(resp => heroPowers = resp.data)

    axios.get(url)
    .then(resp => {

        let heroName = resp.data.hero_name == null ? `${resp.data.first_name}${resp.data.last_name}` : resp.data.hero_name
        res.render('pages/heroSingle', {
            title: heroName,
            name: heroName,
            data: resp.data,
            asideData: heroAsideData,
            heroPowers
        })
    })
})

// step 1b
module.exports = router