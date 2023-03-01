const { Schema, model } = require("mongoose");

const coordsSchema = Schema({
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

const MarkerSchema = Schema({
  name: {
    type: String,
    required: [true, "Se requiere nombre"],
  },
  user: {
    type: String,
    required: [true, "Se requiere operario"],
  },
  coords: {
    type: coordsSchema,
    required: [true, "Se requieren las coordenadas"],
  },
  img: {
    type: String,
  },
  icon: {
    type: String,
  },
  comments: {
    type: [
      {
        msg: String,
        username: String,
      },
    ],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Marker", MarkerSchema);
