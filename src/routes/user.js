const { Router } = require("express");
const {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users");
const jwtValidator = require("../middleware/jwtValidator");
const isAdmin = require("../middleware/isAdmin");

const router = Router();

router.use(jwtValidator);
router.use(isAdmin);

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
