const mongoose = require('mongoose');


const fridgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    owner: String,
    streetAddress: String,
    stateOrProvince: String,
    city: String,
    country: String,
    donationUrl:  String,
    websiteUrl: String,
    imageUrl: String,
    isStocked: {type: Boolean, default: false},
    hasFridge: Boolean,
    hasPantry: Boolean,
    hasFreezer: Boolean,
    lat: Number,
    lng: Number,

},
    { timestamps: true }
)

module.exports = mongoose.model('Fridge', fridgeSchema);