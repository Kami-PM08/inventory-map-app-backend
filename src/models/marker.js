const { Schema, model } = require("mongoose");

const coordsSchema = Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

const MarkerSchema = Schema({
    operator: {
        type: String,
        required: [true, "Se requiere operario"]
    },
    coords: {
        type: coordsSchema,
        required: true
    },
    img: {
        type: String
    },
    comments: {
        type: [{
            msg: String,
            username: String,
            created: {
                type: Date,
                default: Date.now()
            }
        }]
    }
});

module.exports = model("Marker", MarkerSchema);