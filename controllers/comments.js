const Fridge = require("../models/fridge");

module.exports = {
    create,
    delete: deleteComment,
}

function create(req, res){
    console.log(req.body, "req.body comment")
    Fridge.findById(req.params.id, function(err, fridge) {
        req.body.user = req.user._id
        req.body.username = req.user.username
        fridge.comments.push(req.body)
        fridge.save(function(err) {
            console.log(err, 'create controller for comments')
        })
    })
    console.log('I made a comment!')
}

async function deleteComment(req, res){
    Fridge.findOne({'comments._id': req.params.id}).then(function(fridge) {
        const comment = fridge.comments.id(req.params.id);
        comment.remove();
        fridge.save(function(err) {
            console.log(err, "delete Comment function controller")
        });
    })
    // try {
    //     const fridge = await Fridge.findOne({'comments._id': req.params.id});
    //     const comment = await fridge.comments.id(req.params.id);
    //     comment.remove();
    //     fridge.save();
    // } catch(err) {
    //     console.log(err)
    // }
    console.log("deleting a comment")
}