const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
    {
        _id:{
            type: Number,
            required: true
        },
        pressure:{
            type: Number,
            required: true
        },
        flow:{
            type: Number,
            required: true
        },
        volume: {
            type: Number,
            required: true
        },
        alarm: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("dados", dataSchema);