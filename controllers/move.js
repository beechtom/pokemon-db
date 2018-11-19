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