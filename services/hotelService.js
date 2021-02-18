const Hotel = require('../models/Hotel');

function createHotel(data, owner) {
    const hotel = new Hotel({...data, owner });
    return hotel.save();
}

function getAll() {
    return Hotel.find().lean();
}

module.exports = {
    createHotel,
    getAll
}