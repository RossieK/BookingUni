const Hotel = require('../models/Hotel');

async function createHotel(data, owner) {
    let hotelFound = await Hotel.findOne({ name: data.name });

    if (hotelFound) {
        throw new Error('Hotel already exists');
    }
    const hotel = new Hotel({...data, owner });
    return hotel.save();
}

function getAll() {
    return Hotel.find().lean();
}

function getOne(id) {
    return Hotel.findOne({ _id: id }).lean();
}

async function bookOne(id, user) {
    let hotel = await Hotel.findOne({ _id: id });
    hotel.usersBooked.push(user);
    hotel.freeRooms--;
    return Hotel.updateOne({ _id: id }, { usersBooked: hotel.usersBooked, freeRooms: hotel.freeRooms });
}

function updateOne(id, data) {
    return Hotel.updateOne({ _id: id }, {...data });
}

function deleteOne(id) {
    return Hotel.deleteOne({ _id: id });
}

function getBookedByUser(user) {
    return Hotel.find({ usersBooked: { "$in": [user] } }).lean();
}

module.exports = {
    createHotel,
    getAll,
    getOne,
    bookOne,
    updateOne,
    deleteOne,
    getBookedByUser
}