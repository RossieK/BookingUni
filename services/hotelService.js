const Hotel = require('../models/Hotel');

function createHotel(data, owner) {
    const hotel = new Hotel({...data, owner });
    return hotel.save();
}

module.exports = {
    createHotel,
}