const router = require('express').Router();
const userService = require('../services/userService');
const { cookie_name } = require('../config/config');
const registerValidator = require('../middlewares/userMiddlewareValidator');
const formValidator = require('../middlewares/formValidator');
const isGuest = require('../middlewares/isGuest');
const isLogged = require('../middlewares/isLogged');
const hotelService = require('../services/hotelService');

router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register page' });
});

router.post('/register', isGuest, registerValidator, (req, res) => {

    const formValidations = formValidator(req);

    if (!formValidations.isValid) {
        res.render('register', {...formValidations.options, title: 'Register page' });
        return;
    }

    const { email, username, password, rePassword } = req.body;

    userService.register({ email, username, password })
        .then(async(user) => {
            let token = await userService.loginUponRegistration(user);
            res.cookie(cookie_name, token);
            res.redirect('/');
        })
        .catch(err => {
            res.render('register', { oldInput: req.body, title: 'Register page', message: err.message });
        });
});

router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await userService.login({ username, password });
        res.cookie(cookie_name, token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { oldInput: {...req.body }, message: error.message, title: 'Login page' });
    }
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/user/login');
});

router.get('/myprofile', isLogged, (req, res) => {
    hotelService.getBookedByUser(req.user._id)
        .then(hotels => {
            res.render('profile', { title: 'My profile', hotels });
        })
        .catch(error => {
            console.log(error);
            res.render('profile', { message: 'Something went wrong, we are sorry', title: 'My profile' });
        });
});

module.exports = router;