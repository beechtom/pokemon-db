var pool = require('../middlewares/pool');

/*
 * CREATE A RATING
 */

exports.create = function(req, res) {
    var options = {
        sql: 'INSERT INTO ratings (num, party) VALUES (?, ?)',
        values: [req.body.rating,
                 req.params.id],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error inserting rating.'); }
        res.redirect('/party/' + req.params.id);
    });
};