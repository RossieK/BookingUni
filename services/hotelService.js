const Hotel = require('../models/Hotel');

function createHotel(data, owner) {
    const hotel = new Hotel({...data, owner });
    return hotel.save();
}

function getAll() {
    return Hotel.find().lean();
}

function getOne(id) {
    return Hotel.findOne({ _id: id }).lean();
}

module.exports = {
    createHotel,
    getAll,
    getOne
}