const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const hotelController = require('./controllers/hotelController');
const isLogged = require('./middlewares/isLogged');

router.use('/', homeController);
router.use('/user', userController);
router.use('/hotel', isLogged, hotelController);


module.exports = router;