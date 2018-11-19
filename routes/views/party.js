var express = require('express'),
    router  = express.Router();

// CONTROLLERS
var Party = require('../../controllers/party');

// Show individual Pokemon
router.get('/', Party.index);
router.post('/', Party.create);
router.get('/:id', Party.show);
router.delete('/:id', Party.delete);

module.exports = router;