var express = require('express'),
    router  = express.Router(),
    Type    = require('../../controllers/type');

router.get('/', Type.index);
router.post('/', Type.create);

module.exports = router;