const express = require('express')
const router = express.Router()

const dao = require('../../daos/api/heroDao')

// findAll
//localhost:3000/api/hero
router.get('/',(req, res)=> {
    dao.findHeroes(res, dao.table)
})

// by alignment
router.get('/alignment/:alignment', (req, res)=> {
    dao.findByAlignment(res, dao.table, req.params.alignment)
})


//sort
router.get('/sort', (req, res)=> {
    dao.sort(res, dao.table)
})


// findById
router.get('/:id', (req, res)=> {
    dao.findheroById(res, dao.table, req.params.id)
})

router.get('/:id/power', (req, res)=> {
    dao.findHeroPowers(res, dao.table, req.params.id)
})

module.exports = router