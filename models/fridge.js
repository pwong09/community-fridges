const mongoose = require('mongoose');

const fridgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    streetAddress: { type: String, required: true },
    state: { type: String, required: true },
    operatingHours: {type: [{
        day: {type: Date}, //mon - sun
        periods: [{
            start: {type: Date},
            end: {type: Date}
            }]
        }], default: '24 hours, 7 days a week'},
    donationLink: String,
    imageUrl: String,
    isStocked: Boolean,
    hasFridge: Boolean,
    hasPantry: Boolean,
    hasFreezer: Boolean },
    { timestamps: true }
)

module.exports = mongoose.model('Fridge', fridgeSchema);