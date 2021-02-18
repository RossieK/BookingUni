const router = require('express').Router();
const hotelService = require('../services/hotelService');
const formValidator = require('../middlewares/formValidator');
const hotelValidator = require('../middlewares/hotelMiddlewareValidator');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Add hotel' });
});

router.post('/create', hotelValidator, (req, res) => {
    const formValidations = formValidator(req);

    if (!formValidations.isValid) {
        res.render('create', {...formValidations.options, title: 'Add hotel' });
        return;
    }

    hotelService.createHotel(req.body, req.user._id)
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error);
            res.render('create', { oldInput: {...req.body }, message: 'Something went wrong, please try again', title: 'Add hotel' });
        });
});

router.get('/:id/details', (req, res) => {
    hotelService.getOne(req.params.id)
        .then(hotel => {
            res.render('details', { title: 'Hotel details', hotel });
        })
        .catch(error => {
            console.log(error);
            res.render('details', { message: 'Something went wrong, please try again', title: 'Add hotel' });
        })
});

module.exports = router;