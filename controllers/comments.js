const Fridge = require("../models/fridge");

module.exports = {
    create,
    delete: removeComment
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

async function removeComment(req, res) {
    console.log(req.params.id)
    try {
        const fridge = await Fridge.findOne({"comments._id": req.params.id});
        if (!fridge.user.equals(req.user._id)) return res.status(401).json('Unauthorized action')
        const comment = await fridge.comments.id(req.params.id);
        await comment.remove();
        await fridge.save();
        res.status(202).json({fridge})
    } catch(err) {
        res.status(400).json({err})
    }
}