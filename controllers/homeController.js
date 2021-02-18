const router = require('express').Router();
const hotelService = require('../services/hotelService');

router.get('/', (req, res) => {
    hotelService.getAll()
        .then(hotels => {
            res.render('home', { title: 'BookingUni', hotels });
        })
        .catch(err => {
            console.log(err);
            res.render('home', { title: 'BookingUni', message: 'Sorry, something went wrong' });
        });
});

module.exports = router;