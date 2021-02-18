const hotelService = require('../services/hotelService');

module.exports = async function(userId, hotelId) {
    try {
        let hotel = await hotelService.getOne(hotelId);
        let isOwner = false;
        if (hotel.owner.toString() == userId.toString()) {
            isOwner = true;
        }
        return isOwner;
    } catch (error) {
        console.error(error);
    }
}