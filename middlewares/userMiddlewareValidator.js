const { body } = require('express-validator');

module.exports = [
    body('username', 'The provided username is not valid...').isAlphanumeric('en-US').isLength({ min: 3 }),
    body('password', 'The provided password is not valid...').isAlphanumeric('en-US').isLength({ min: 3 }),
    body('rePassword').custom(customRePasswordCheck)
]

function customRePasswordCheck(rePassword, { req }) {
    if (rePassword != req.body.password) {
        throw new Error('Both passwords should match...');
    }

    return true;
}