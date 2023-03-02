const { Router } = require("express");
const {
  getMarker,
  getMarkers,
  getMarkersByUser,
  postMarker,
  putMarker,
  deleteMarker,
} = require("../controllers/marker");
const isAdmin = require("../middleware/isAdmin");
const jwtValidator = require("../middleware/jwtValidator");

const router = Router();

router.use(jwtValidator);

router.get("/", isAdmin, getMarkers);
router.get("/:user", getMarkersByUser);
router.post("/", postMarker);
router.put("/:id", putMarker);
router.delete("/:id", deleteMarker);

module.exports = router;
