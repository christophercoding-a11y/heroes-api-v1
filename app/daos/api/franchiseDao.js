const con = require('../../config/dbconfig')

const franchiseDao = {
    table: 'franchise',
    ...require('../daoCommon'),
    findHeroesByfranchise: (res, table, franchise)=> {
        con.query(
            `select h.hero_id, h.hero_name, h.first_name, 
            h.last_name, h.alias, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
            from hero h
            join franchise f using (franchise_id)
            join species s using (species_id)
            where f.franchise = '${franchise}'
            order by h.hero_id;`,
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`DAO ERROR: ${table}`, error)
                }
            }
        )
    }
}

module.exports = franchiseDao