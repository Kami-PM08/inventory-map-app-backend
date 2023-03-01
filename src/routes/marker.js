const { Router } = require("express");
const {
  getMarker,
  getMarkers,
  getMarkersByUser,
  postMarker,
  putMarker,
  deleteMarker,
} = require("../controllers/marker");

const router = Router();

router.get("/", getMarkers);
router.get("/:user", getMarkersByUser);
router.post("/", postMarker);
router.put("/:id", putMarker);
router.delete("/:id", deleteMarker);

module.exports = router;
