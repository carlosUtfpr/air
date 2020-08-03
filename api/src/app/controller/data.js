const Data = require("../model/data");

class dataController{
    async index(req, res){
        const data = await Data.find({});

        return res.json(data);
    }

    async show(req, res){
        const data = await Data.find().sort({_id:-1}).limit(parseInt(req.query.max));

        return res.json(data);
    }
}

module.exports = new dataController();