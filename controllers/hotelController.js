const router = require('express').Router();
const hotelService = require('../services/hotelService');
const userService = require('../services/userService');
const formValidator = require('../middlewares/formValidator');
const hotelValidator = require('../middlewares/hotelMiddlewareValidator');
const isCreator = require('../middlewares/isCreator');

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
        .then(async(hotel) => {
            await userService.createHotel(req.user._id, hotel._id);
            res.redirect('/')
        })
        .catch(error => {
            console.log(error);
            res.render('create', { oldInput: {...req.body }, message: error.message, title: 'Add hotel' });
        });
});

router.get('/:id/details', (req, res) => {
    hotelService.getOne(req.params.id)
        .then(hotel => {
            let isOwner = false;
            if (hotel.owner.toString() == req.user._id.toString()) {
                isOwner = true;
            }

            let hasBooked = false;
            hotel.usersBooked.forEach(personBooked => {
                if (personBooked._id.toString() == req.user._id.toString()) {
                    hasBooked = true;
                }
            });

            res.render('details', { title: 'Hotel details', hotel, isOwner, hasBooked });
        })
        .catch(error => {
            console.log(error);
            res.render('details', { message: 'Something went wrong, we are sorry', title: 'Hotel details' });
        })
});

router.get('/:id/book', async(req, res) => {

    let isOwner = await isCreator(req.user._id, req.params.id);

    if (isOwner) {
        res.redirect(`/hotel/${req.params.id}/details`);
        return;
    } else {
        hotelService.bookOne(req.params.id, req.user._id)
            .then(async() => {
                await userService.bookHotel(req.user._id, req.params.id);
                res.redirect(`/hotel/${req.params.id}/details`);
            })
            .catch(error => {
                console.log(error);
                res.render('details', { message: 'Something went wrong, we are sorry', title: 'Hotel details' });
            });
    }

});

router.get('/:id/edit', async(req, res) => {

    let isOwner = await isCreator(req.user._id, req.params.id);

    if (!isOwner) {
        res.redirect(`/hotel/${req.params.id}/details`);
        return;
    }

    hotelService.getOne(req.params.id)
        .then(hotel => {
            res.render('edit', { title: 'Edit hotel', hotel });
        })
        .catch(error => {
            console.log(error);
            res.render('edit', { message: 'Something went wrong, we are sorry', title: 'Edit hotel' });
        });
});

router.post('/:id/edit', hotelValidator, async(req, res) => {
    let isOwner = await isCreator(req.user._id, req.params.id);

    if (!isOwner) {
        res.redirect(`/hotel/${req.params.id}/details`);
        return;
    }

    const formValidations = formValidator(req);

    if (!formValidations.isValid) {
        res.render('edit', { message: formValidations.options.message, hotel: formValidations.options.oldInput, title: 'Edit hotel' });
        return;
    }

    hotelService.updateOne(req.params.id, req.body)
        .then(() => {
            res.redirect(`/hotel/${req.params.id}/details`);
        })
        .catch(error => {
            console.log(error);
            res.render('edit', { hotel: {...req.body }, message: 'Something went wrong, please try again', title: 'Edit hotel' });
        });
});

router.get('/:id/delete', (req, res) => {
    hotelService.deleteOne(req.params.id)
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error);
            res.render('details', { message: 'Something went wrong, please try again', title: 'Hotel details' });
        });
});

module.exports = router;