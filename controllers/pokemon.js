var pool = require('../middlewares/pool');

/*
 * POKEMON INDEX PAGE
 */

exports.index = function(req, res) {
    var options = {
        sql: 'SELECT pokemon.id, pokemon.name, flavor, sprite, ' +
             't1.name AS first, t1.color AS firstColor, ' +
             't2.name AS second, t2.color AS secondColor ' +
             'FROM pokemon ' +
             'LEFT JOIN types t1 ON t1.id = pokemon.ptype ' +
             'LEFT JOIN types t2 ON t2.id = pokemon.stype ' +
             'WHERE t1.name LIKE ? OR t2.name LIKE ?; ' +
             'SELECT id, name FROM types ORDER BY name',
        values: [ req.query.type || "%",
                  req.query.type || "%"],
    }

    pool.query (options, function(err, results) {
        if (err) { console.log('Error selecting all Pokemon.'); }
        res.render('pokemon/index', {pokemon: results[0], type: results[1]});
    });
};


/*
 * CREATE POKEMON
 */

exports.create = function(req, res) {
    var options = {
        sql: 'INSERT INTO pokemon (id, name, flavor, sprite, ptype, stype) ' +
             'VALUES (?, ?, ?, ?, ?, ?)',
        values: [req.body.id,
                 req.body.name,
                 req.body.flavor,
                 req.body.sprite,
                 req.body.ptype,
                 req.body.stype],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error adding Pokemon.'); }
        res.redirect('/pokemon');
    });
};


/*
 * SHOW INDIVIDUAL POKEMON
 */

exports.show = function(req, res) {
    // SELECT POKEMON
    var options = {
    sql: 'SELECT pokemon.name, flavor, sprite, ' +
         't1.name AS first, t1.color AS firstColor, ' +
         't2.name AS second, t2.color AS secondColor ' +
         'FROM pokemon ' +
         'LEFT JOIN types t1 ON t1.id = pokemon.ptype ' +
         'LEFT JOIN types t2 ON t2.id = pokemon.stype ' +
         'WHERE pokemon.id = ?; ' +
         'SELECT moves.name, moves.id, flavor, pp, power, accuracy, color, types.name AS type ' + 
         'FROM moves ' +
         'JOIN pokemon_moves ON pokemon_moves.move = moves.id ' +
         'LEFT JOIN types ON types.id = moves.type ' +
         'WHERE pokemon_moves.pokemon = ? ' +
         'ORDER BY moves.name; ' + 
         'SELECT regions.id, regions.name ' +
         'FROM regions ' +
         'JOIN pokemon_regions ON pokemon_regions.region = regions.id ' +
         'WHERE pokemon_regions.pokemon = ?; ' +
         'SELECT moves.name, moves.id FROM moves ' +
         'WHERE moves.id NOT IN ( ' +
         'SELECT move FROM pokemon_moves ' +
         'WHERE pokemon = ?);' +
         'SELECT name, id FROM regions WHERE id NOT IN ( ' +
         'SELECT region FROM pokemon_regions WHERE pokemon = ?);',
    values: [req.params.id, 
             req.params.id, 
             req.params.id, 
             req.params.id, 
             req.params.id],
    };

    pool.query (options, function(err, results) {
        if (err) { console.log('Error selecting pokemon.'); }

        var context = {
            id: req.params.id,
            name: results[0][0].name,
            sprite: results[0][0].sprite,
            flavor: results[0][0].flavor,
            first: results[0][0].first,
            firstColor: results[0][0].firstColor,
            second: results[0][0].second,
            secondColor: results[0][0].secondColor,
            move: results[1],
            region: results[2],
            remMove: results[3],
            remRegion: results[4],
        }

        res.render('pokemon/show', context);
    });
};