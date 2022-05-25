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
    imageUrl: String,
    isStocked: Boolean,
    hasFridge: Boolean,
    hasPantry: Boolean,
    hasFreezer: Boolean,
    geo: {type: Object}
},
    { timestamps: true }
)

module.exports = mongoose.model('Fridge', fridgeSchema);