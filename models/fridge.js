const mongoose = require('mongoose');

const fridgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    owner: { type: String},
    streetAddress: { type: String },
    stateOrProvince: { type: String},
    country: {type: String},
    donationUrl:  {type: String},
    imageUrl: String,
    isStocked: Boolean,
    hasFridge: Boolean,
    hasPantry: Boolean,
    hasFreezer: Boolean },
    { timestamps: true }
)

module.exports = mongoose.model('Fridge', fridgeSchema);