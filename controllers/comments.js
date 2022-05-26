const Fridge = require("../models/fridge");

module.exports = {
    create,
    delete: deleteComment
}

function create(req, res){
    console.log(req.body, "req.body comment")
    Fridge.findById(req.params.id, function(err, fridge) {
        req.body.user = req.user._id
        req.body.username = req.user.username
        fridge.comments.push(req.body)
        fridge.save(function(err) {
            console.log(err)
        })
    })
    // console.log(req.body, "req.body create comment")
    

    // Fridge.findOne({'_id': req.params.id}, function (fridge, err) {
    //     console.log(fridge)
    // });
    // fridge.comments.push(req.body.comment)
    // fridge.save();
    console.log('I made a comment!')
}

function deleteComment(req, res){
    console.log("deleting a comment")
}