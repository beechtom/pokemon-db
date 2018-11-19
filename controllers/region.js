var pool = require('../middlewares/pool');

/*
 * TYPE INDEX PAGE
 */

exports.index = function(req, res) {
    var options = {
        sql: 'SELECT id, name FROM regions ORDER BY name',
    }

    pool.query (options, function(err, region) {
        if (err) { console.log('Error selecting regions.'); }
        res.render('region/index', {region: region});
    });
};


/*
 * CREATE A TYPE
 */

exports.create = function(req, res) {
    var options = {
        sql: 'INSERT INTO regions (name) VALUES (?)',
        values: [req.body.name],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error adding region.'); }
        res.redirect('/region');
    });
};


/*
 * DELETE A TYPE
 */

exports.delete = function(req, res) {
    var options = {
        sql: 'DELETE FROM regions WHERE id = ?',
        values: [req.params.id],
    }

    pool.query (options, function(err) {
        if (err) { console.log('Error deleting region.'); }
        res.redirect('/region');
    });
};