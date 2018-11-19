var express = require('express'),
    router  = express.Router(),
    Move  = require('../../controllers/move');

router.get('/', Move.index);
router.post('/', Move.create);
router.delete('/:id', Move.delete);

module.exports = router;