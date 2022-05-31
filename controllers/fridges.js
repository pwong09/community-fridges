const Fridge = require("../models/fridge");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the constructor
const request = require('request');

module.exports = {
    create,
    index,
    delete: removeFridge,
    update,
    show,
    filter: someFridges
}

async function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const address = req.body.streetAddress + req.body.city + req.body.stateOrProvince
        const key = process.env.REACT_APP_GEO_API
        request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`, 
        function(err, response, body) {
            const data = JSON.parse(body);
        // console.log(data.results[0].geometry.location.lat.toString()) // <-- returns object with lat and lng properties
        const latX = data.results[0].geometry.location.lat;
        const lngY = data.results[0].geometry.location.lng;
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const fridge = await Fridge.create({
                user: req.user,
                streetAddress: req.body.streetAddress,
                stateOrProvince: req.body.stateOrProvince,
                donationUrl: req.body.donationUrl,
                websiteUrl: req.body.website,
                imageUrl: data.Location,
                country: req.body.country,
                city: req.body.city,
                lat: latX,
                lng: lngY,
                isStocked: req.body.stocked,
                hasFridge: req.body.hasFridge,
                hasPantry: req.body.hasPantry,
                hasFreezer: req.body.hasFreezer,
                name: req.body.name
            });
            console.log(fridge);
			await fridge.populate('user');
            res.status(201).json({fridge: fridge})
        })
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
        res.status(202).json({fridge})
    } catch(err) {
        console.log(err, "from removeFridge controller")
        res.json(err);
    }
}

async function update(req, res) {
    console.log(req.body, 'req.body')
    try {
        const fridge = await Fridge.findOneAndUpdate({'_id': req.params.id}, req.body, {
            new: true
        })
        console.log(fridge)
        res.status(202).json({fridge})
    } catch(err) {
        console.log(err, "from update fridge function")
        res.json(err)
    }
}

async function show(req, res) {
    try {
        const fridge = await Fridge.findById(req.params.id);
        if (!fridge) return res.status(404).json({err: "Fridge doesn't exist!"});
        res.status(200).json({fridge})
    } catch(err){
        console.log(err, "from show one fridge function")
        res.json(err)
    } 
}

async function someFridges(req, res) {
    try {
        const fridges = await Fridge.find({"stateOrProvince": req.params.id});
        if (!fridges) return res.status(404).json({err: "No matching fridges!"});
        res.status(200).json({fridges});
    } catch(err) {
        console.log(err, "from filtering for someFridges function")
        res.json(err)
    }
}