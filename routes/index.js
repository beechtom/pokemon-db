var express = require('express'),
    router  = express.Router(),
    Move  = require('./'),
    pokemonRouter = require('./views/pokemon'),
    partyRouter   = require('./views/party'),
    typeRouter    = require('./views/type'),
    regionRouter  = require('./views/region'),
    moveRouter    = require('./views/move'),
    ratingRouter  = require('./views/rating');

router.use('/pokemon', pokemonRouter);
router.use('/type', typeRouter);
router.use('/party', partyRouter);
router.use('/region', regionRouter);
router.use('/move', moveRouter);
router.use('/rating', ratingRouter);

module.exports = router;