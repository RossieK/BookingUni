const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const hotelController = require('./controllers/hotelController');

router.use('/', homeController);
router.use('/user', userController);
router.use('/hotel', hotelController);


module.exports = router;