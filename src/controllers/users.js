const { request, response } = require("express");
const bcryptjs = require("bcrypt");

const User = require("../models/user");

const getUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      msg: "Error al traer usuarios",
    });
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({
      msg: "Error al traer usuarios",
    });
  }
};
const postUser = async (req = request, res = response) => {
  const { body } = req;

  const user = new User(body);

  const oldUser = await User.findByPk(user.get("user_name"));

  if (oldUser) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  const salt = bcryptjs.genSaltSync();
  user.set("password", bcryptjs.hashSync(user.get("password"), salt));

  try {
    await user.save();

    res.json({
      msg: "Usuario creado",
      user: {
        user_name: user.get("user_name"),
        rol: user.get("rol"),
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear usuario",
    });
  }
};
const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, rol } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    if (!password) {
      const salt = bcryptjs.genSaltSync();
      const encodePass = bcryptjs.hashSync(password, salt);

      await user.update({ password: encodePass, rol });
    } else {
      await user.update({ rol });
    }

    res.json({
      msg: "Usuario actualizado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar usuario",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        user_name: id,
      },
    });

    res.json({
      msg: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al eliminar usuario",
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
