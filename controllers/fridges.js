const Fridge = require("../models/fridge");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the constructor

module.exports = {
    create,
    index,
    delete: removeFridge
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const fridge = await Fridge.create({
                user: req.user,
                streetAddress: req.body.streetAddress,
                stateOrProvince: req.body.stateOrProvince,
                donationUrl: req.body.donationUrl,
                imageUrl: data.Location,
                country: req.body.country,
                city: req.body.city,
                lat: req.body.lat,
                lng: req.body.lng
                // isStocked: req.body.stocked,
                // hasFridge: req.body.fridge,
                // hasPantry: req.body.pantry,
                // hasFreezer: req.body.freezer
            });
            console.log(fridge);
			await fridge.populate('user');
            res.status(201).json({fridge: fridge})
        })

    } catch(err){
        console.log(err, "from create fridges controller")
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const fridges = await Fridge.find({}).exec()
        res.status(200).json({fridges})
    } catch(err){
        console.log(err, "from index fridges controller");
        res.json(err);
    }
}

async function removeFridge(req, res) {
    try {
        const fridge = await Fridge.findByIdAndDelete(req.params.id)
        res.status(200).json({fridge})
    } catch(err) {
        console.log(err, "from removeFridge controller")
        res.json(err);
    }
}