const { request, response } = require("express");

const Marker = require("../models/marker");

const getMarker = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "getMarker",
    id,
  });
};

const getMarkers = (req = request, res = response) => {
  res.json({
    msg: "getMarkers",
  });
};
const postMarker = async (req = request, res = response) => {
  const { body } = req;
  const marker = new Marker(body);

  try {
    await marker.save();

    res.json({
      msg: "postMarker",
      marker,
    });
  } catch (error) {
    console.log("Error al crear marcador: ", error);
  }
};
const putMarker = (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: "putMarker",
    id,
    body,
  });
};

const deleteMarker = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "deleteMarker",
    id,
  });
};

module.exports = {
  getMarker,
  getMarkers,
  postMarker,
  putMarker,
  deleteMarker,
};
