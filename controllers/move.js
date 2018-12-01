var pool = require('../middlewares/pool');

/*
 * MOVE INDEX PAGE
 */

exports.index = function(req, res) {
    var options = {
        sql: 'SELECT moves.id, moves.name, flavor, pp, power, accuracy, color, types.name AS type ' +
             'FROM moves ' +
             'LEFT JOIN types ON types.id = moves.type ' +
             'WHERE types.name LIKE ? ' +
             'ORDER BY moves.name; ' +
             'SELECT id, name FROM types;',
        values: [req.query.type || "%"],
    }

    pool.query (options, function(err, results) {
        if (err) { next(err); return; }
        res.render('move/index', {move: results[0], type: results[1]});
    });
};


/*
 * CREATE A MOVE
 */

exports.create = function(req, res) {
    var options = {
        sql: 'INSERT INTO moves (name, flavor, pp, power, accuracy, type) ' +
             'VALUES (?, ?, ?, ?, ?, ?)',
        values: [req.body.name,
                 req.body.flavor,
                 req.body.pp,
                 req.body.power,
                 req.body.accuracy,
                 req.body.type],
    }

    pool.query (options, function(err) {
        if (err) { console.log('ERROR: Attempted to add existing move.'); }
        res.redirect('/move');
    });
};


/*
 * READ A MOVE
 */

exports.read = function(req, res) {
    var options = {
        sql: 'SELECT name, flavor, pp, power, accuracy, type ' +
             'FROM moves ' +
             'WHERE id = ?',
        values: [req.params.id],
    }

    pool.query (options, function(err, results) {
        if (err) { console.log('ERROR: Cannot select move.'); }

        var context = {
            name: results[0].name,
            flavor: results[0].flavor,
            pp: results[0].pp,
            power: results[0].power,
            accuracy: results[0].accuracy,
            type: results[0].type,
        }

        res.json(context);
    });
};


/*
 * UPDATE A MOVE
 */

exports.update = function(req, res) {
    var options = {
        sql: 'UPDATE moves SET ' +
             'name = ?, flavor = ?, pp = ?, power = ?, accuracy = ?, type = ? ' +
             'WHERE id = ?',
        values: [req.body.name,
                 req.body.flavor,
                 req.body.pp,
                 req.body.power,
                 req.body.accuracy,
                 req.body.type,
                 req.params.id],
    }

    pool.query (options, function(err) {
        if (err) { console.log('ERROR: Could not update move.'); }
        res.redirect('/move');
    });
};


/*
 * DELETE A MOVE
 */

exports.delete = function(req, res) {
    var options = {
        sql: 'DELETE FROM moves WHERE id = ?',
        values: [req.params.id],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error deleting move.'); }
        res.redirect('/move');
    });
};