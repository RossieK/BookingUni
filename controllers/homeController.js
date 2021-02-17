const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'BookingUni' });
});

module.exports = router;