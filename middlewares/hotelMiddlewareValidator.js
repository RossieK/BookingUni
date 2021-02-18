const { body } = require('express-validator');

module.exports = [
    body('name', 'The name should be at least 4 chars long').isLength({ min: 4 }),
    body('city', 'The city should be at least 3 chars long').isLength({ min: 3 }),
    body('imageUrl', 'The image URL should start with http or https').matches(/^https?:\/\/(.*)/),
    body('freeRooms', 'The number of free rooms should be between 1 and 100').isFloat({ min: 1, max: 100 })
]