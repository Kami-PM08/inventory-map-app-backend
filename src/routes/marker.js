const { Router } = require("express");
const { getMarker, getMarkers, postMarker, putMarker, deleteMarker } = require("../controllers/marker");

const router = Router();

router.get("/", getMarkers);
router.get("/:id", getMarker);
router.post("/", postMarker);
router.put("/:id", putMarker);
router.delete("/:id", deleteMarker);

module.exports = router;