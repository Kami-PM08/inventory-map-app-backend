const { request, response } = require("express");
const marker = require("../models/marker");

const Marker = require("../models/marker");

const getMarker = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const marker = await Marker.findById(id);

    if (!marker) {
      return res.status(404).json({
        msg: "Marcador no encontrado",
      });
    }

    res.json({
      marker,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al traer usuarios",
    });
  }
};

const getMarkers = async (req = request, res = response) => {
  try {
    const markers = await Marker.find();
    res.json({ markers });
  } catch (error) {
    res.status(500).json({
      msg: "Error al traer usuarios",
    });
  }
};

const getMarkersByUser = async (req = request, res = response) => {
  const { operator } = req.params;

  try {
    const markers = await Marker.find({ operator: operator });
    res.json({ markers });
  } catch (error) {
    res.status(500).json({
      msg: "Error al traer usuarios",
    });
  }
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

const deleteMarker = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await Marker.findByIdAndDelete(id);

    res.json({
      msg: "Se ha eliminado el marcador",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar marcador",
    });
  }
};

module.exports = {
  getMarker,
  getMarkers,
  getMarkersByUser,
  postMarker,
  putMarker,
  deleteMarker,
};
