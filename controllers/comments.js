const Fridge = require("../models/fridge");

module.exports = {
    create
}

async function create(req, res) {
    console.log(req.body, "comment's req.body")
    try {
        const fridge = await Fridge.findById(req.params.id);
        fridge.comments.push({
            username: req.user.username,
            user: req.user._id,
            comment: req.body.comment
        });
        console.log(fridge);
        await fridge.save();
        res.status(201).json({fridge})
    } catch(err){
        res.status(400).json({err})
    }
}