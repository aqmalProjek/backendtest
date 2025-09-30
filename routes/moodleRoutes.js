const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createMoodle,
  getAllMoodles,
  getMoodleBySlug,
  updateMoodle,
  deleteMoodle
} = require("../controllers/moodleController");

// Semua endpoint moodle harus login
router.post("/", authMiddleware, createMoodle);
router.get("/", getAllMoodles);
router.get("/:slug", getMoodleBySlug);
router.put("/:id", authMiddleware, updateMoodle);
router.delete("/:id", authMiddleware, deleteMoodle);

module.exports = router;
