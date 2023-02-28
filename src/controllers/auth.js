const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const User = require("../models/user");
const { postUser } = require("./users");

const login = async (req = request, res = response) => {
  const { user_name, password } = req.body;

  try {
    const user = await User.findByPk(user_name);

    if (!user || !bcryptjs.compareSync(password, user.get("password"))) {
      return res.status(404).json({
        msg: "El usuario o contraseña no es valido",
      });
    }

    const token = jwt.sign(
      { user_name, rol: user.get("rol") },
      process.env.JWT_PRIVATE
    );

    res.header("jwt", token);

    res.json({
      msg: "Ingreso correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error de autenticación",
    });
  }
};

module.exports = {
  login,
};
