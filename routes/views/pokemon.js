var express = require('express'),
    pool    = require('../../middlewares/pool'),
    router  = express.Router();

// CONTROLLERS
var Pokemon = require('../../controllers/pokemon');

// Show individual Pokemon
router.get('/', Pokemon.index);
router.post('/', Pokemon.create);
router.get('/:id', Pokemon.show);


// Add pokemon_moves
router.post('/:id/move', function(req, res) {
    var sql = 'INSERT INTO pokemon_moves (pokemon, move) VALUES ?';

    // Convert body to array
    var moves = [req.body.move];
    moves = Array.prototype.concat.apply([], moves);

    // Construct values to insert
    var add = [];
    moves.forEach(move => {
        add.push([Number(req.params.id), Number(move)]);
    });

    pool.query (sql, [add], function(err) {
        if (err) { console.log(err); }
        res.redirect('/pokemon/' + req.params.id);
    });
});


// Delete pokemon_moves
router.delete('/:pid/move/:mid', function(req, res) {
    var sql = 'DELETE FROM pokemon_moves WHERE pokemon = ? AND move = ?';

    pool.query (sql, [req.params.pid, req.params.mid], function(err) {
        if (err) { console.log(err); }
        res.redirect('/pokemon/' + req.params.pid);
    });
});


// Add pokemon_regions
router.post('/:id/region', function(req, res) {
    var sql = 'INSERT INTO pokemon_regions (pokemon, region) VALUES ?';

    // Convert body into array
    var regions = [req.body.region];
    regions = Array.prototype.concat.apply([], regions);

    // Construct values to insert
    var add = [];
    regions.forEach(region => {
        add.push([Number(req.params.id), Number(region)]);
    });

    pool.query (sql, [add], function(err) {
        if (err) { console.log(err); }
        res.redirect('/pokemon/' + req.params.id);
    });
});

module.exports = router;