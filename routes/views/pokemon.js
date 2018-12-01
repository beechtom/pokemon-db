var express = require('express'),
    pool    = require('../../middlewares/pool'),
    router  = express.Router();

// CONTROLLERS
var Pokemon = require('../../controllers/pokemon');

// Show individual Pokemon
router.get('/', Pokemon.index);
router.post('/', Pokemon.create);
router.get('/:id', Pokemon.show);
router.post('/:id/move', Pokemon.addMove);
router.delete('/:pid/move/:mid', Pokemon.deleteMove);
router.post('/:id/region', Pokemon.addRegion);
router.delete('/:pid/region/:rid', Pokemon.deleteRegion);

module.exports = router;