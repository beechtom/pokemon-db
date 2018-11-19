var pool = require('../middlewares/pool');

/*
 * TYPE INDEX PAGE
 */

 exports.index = function(req, res) {
    var options = {
        sql: 'SELECT id, name, color ' +
             'FROM types ' +
             'ORDER BY name',
    }

    pool.query(options, function(err, types) {
        if (err) { console.log('Error querying types.'); }
        res.render('type/index', {types: types});
    })
 };


/*
 * CREATE A TYPE
 */

exports.create = function(req, res) {
    var options = {
        sql: 'INSERT INTO types (name, color) ' +
             'VALUES (?, ?)',
        values: [req.body.name,
                 req.body.color],
    }

    pool.query (options, function(err) {
        if (err) { console.log('ERROR: Attempted to add existing type.'); }
        res.redirect('/type');
    });
};