const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('OTHER');
});

module.exports = router;