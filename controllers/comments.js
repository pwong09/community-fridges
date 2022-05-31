const Fridge = require("../models/fridge");

module.exports = {
    create
}

async function create(req, res) {
    try {
        const fridge = await Fridge.findById(req.params.id);
        fridge.comments.push({
            username: req.user.username,
            user: req.user._id,
            comment: req.body.comment
        });
        await fridge.save();
        res.status(201).json({fridge})
    } catch(err){
        res.status(400).json({err})
    }
}