const { request, response } = require("express");

const isAdmin = (req = request, res = response, next) => {
  if (req.user.rol != "ADMIN") {
    return res.status(401).json({
      msg: "No tiene permiso para esta petición",
    });
  }
  next();
};

module.exports = isAdmin;
