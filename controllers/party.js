var pool = require('../middlewares/pool');

/*
 * PARTY INDEX PAGE
 */

exports.index = function(req, res) {
    var options = {
        sql: 'SELECT parties.id, name, flavor, ROUND(AVG(num), 1) AS rating ' +
             'FROM parties ' +
             'LEFT JOIN ratings ON ratings.party = parties.id ' +
             'GROUP BY parties.id ' +
             'ORDER BY rating DESC, name; ' +
             'SELECT id, name FROM pokemon ORDER BY name;',
    }

    // Query all parties
    pool.query (options, function(err, results) {
        if (err) { console.log ('Error querying pokemon.'); }
        res.render('party/index', {party: results[0], pokemon: results[1]});
    });
};


/*
 * CREATE A PARTY
 */

exports.create = function(req, res) {
    var sql = {
        first:  'INSERT INTO parties (name, flavor) ' +
                'VALUES (?, ?)',
        second: 'INSERT INTO pokemon_parties (party, pokemon) ' +
                'VALUES ?',
    }

    // Create pool connection for transaction
    pool.getConnection (function(err, connection) {
        if (err) { console.log('Could not create connection.'); }
        // Open a transaction - this allows us to work around node's asynchyness
        connection.beginTransaction(function(err) {
            if (err) { console.log('Error starting party transaction.'); }
            // Make the first query to insert a new party
            connection.query (sql.first, [req.body.name, req.body.flavor], function (err, results) {
                if (err) { console.log('Error inserting party.'); }
                // Retrieve the auto id of the new party
                var values = [[results.insertId, req.body.p1], [results.insertId, req.body.p2],
                              [results.insertId, req.body.p3], [results.insertId, req.body.p3],
                              [results.insertId, req.body.p5], [results.insertId, req.body.p6]];

                // Make the second query to associate pokemon with teams
                connection.query (sql.second, [values], function (err) {
                    if (err) { console.log('Error inserting party pokemon.'); }
                    // Commit the transaction and release the connection to the pool
                    connection.commit(function(err) {
                        if (err) { console.log('Error committing party.'); }
                        connection.release();
                    });
                });
            });
            // Redirect to the parties page
            res.redirect('/party');
        });
    });
};


/*
 * SHOW A PARTY
 */

exports.show = function(req, res) {
    var options = {
        sql: 'SELECT pokemon.id, pokemon.name, pokemon.flavor, pokemon.sprite, ' +
             't1.name AS first, t1.color AS firstColor, ' +
             't2.name AS second, t2.color AS secondColor ' +
             'FROM pokemon_parties ' +
             'JOIN pokemon ON pokemon.id = pokemon_parties.pokemon ' +
             'LEFT JOIN types t1 ON t1.id = pokemon.ptype ' +
             'LEFT JOIN types t2 ON t2.id = pokemon.stype ' +
             'WHERE pokemon_parties.party = ?; ' +
             'SELECT name, flavor, ROUND(AVG(num), 1) AS rating ' +
             'FROM parties ' +
             'LEFT JOIN ratings ON ratings.party = ? ' +
             'WHERE parties.id = ? ' +
             'GROUP BY name;',
        values: [req.params.id,
                 req.params.id,
                 req.params.id],
    }

    // Query for specific party
    pool.query (options, function(err, results) {
        if (err) { console.log('Error querying party.'); }
        res.render('party/show', {id: req.params.id, pokemon: results[0], party: results[1]});
    });
};


/*
 * DELETE A PARTY
 */

exports.delete = function(req, res) {
    var options = {
        sql: 'DELETE FROM parties WHERE id = ?',
        values: [req.params.id],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error deleting party.'); }
        res.redirect('/party');
    });
};