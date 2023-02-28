const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req = request, res = response, next) => {
  const token = req.header("jwt-auth");
  if (!token) {
    return res.status(401).json({
      msg: "Petición invalidada",
    });
  }

  try {
    const { user_name, rol } = jwt.verify(token, process.env.JWT_PRIVATE);
    req.user = { user_name, rol };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token invalido",
    });
  }
};

module.exports = jwtValidator;
