const { request, response } = require("express");
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
  const { user } = req.params;

  try {
    const markers = await Marker.find({ user: user });
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
      marker,
    });
  } catch (error) {
    console.log("Error al crear marcador: ", error);
  }
};
const putMarker = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, user, created, ...data } = req.body;
  try {
    const marker = await Marker.findByIdAndUpdate(id, data);

    res.json({
      marker,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar marcador",
    });
  }
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
