const con = require('../../config/dbconfig')

const speciesDao = {
    table: 'species',
    ...require('../daoCommon'),
    findHeroesBySpecies: (res, table, species)=> {
        con.query(
            `select h.hero_id, h.hero_name, h.first_name, 
            h.last_name, h.alias, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
            from hero h
            join franchise f using (franchise_id)
            join species s using (species_id)
            where s.species = '${species}'
            order by h.hero_id;`,
            (error, rows) => {
                if (!error) {
                    res.json(rows)
                } else {
                    console.log(`DAO ERROR: ${table}`, error)
                }
            }
        )
    }
}

module.exports = speciesDao