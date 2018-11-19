var express = require('express'),
    router  = express.Router(),
    Rating  = require('../../controllers/rating');

router.post('/:id', Rating.create);

module.exports = router;