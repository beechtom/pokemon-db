var express = require('express'),
    router  = express.Router(),
    Region  = require('../../controllers/region');

router.get('/', Region.index);
router.post('/', Region.create);
router.delete('/:id', Region.delete);

module.exports = router;