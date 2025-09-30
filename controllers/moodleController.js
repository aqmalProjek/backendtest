const Moodle = require("../models/moodle");
const User = require("../models/user");

// CREATE
const createMoodle = async (req, res) => {
  try {
    const { title, content, slug, image } = req.body;
    const userId = req.user.id; // ambil dari JWT auth middleware

    const moodle = await Moodle.create({
      title,
      content,
      slug,
      image,
      user_id: userId
    });

    res.status(201).json({ message: "Moodle created", data: moodle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL
const getAllMoodles = async (req, res) => {
  try {
    const moodles = await Moodle.findAll({
      include: [{ model: User, as: "author", attributes: ["id", "username", "full_name"] }]
    });

    res.json(moodles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// READ BY SLUG
const getMoodleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const moodle = await Moodle.findOne({
      where: { slug },
      include: [{ model: User, as: "author", attributes: ["id", "username", "full_name"] }]
    });

    if (!moodle) return res.status(404).json({ message: "Moodle not found" });

    res.json(moodle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateMoodle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, slug, image } = req.body;

    const moodle = await Moodle.findByPk(id);
    if (!moodle) return res.status(404).json({ message: "Moodle not found" });

    await moodle.update({ title, content, slug, image });

    res.json({ message: "Moodle updated", data: moodle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (soft delete)
const deleteMoodle = async (req, res) => {
  try {
    const { id } = req.params;

    const moodle = await Moodle.findByPk(id);
    if (!moodle) return res.status(404).json({ message: "Moodle not found" });

    await moodle.destroy(); // soft delete karena paranoid: true

    res.json({ message: "Moodle deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createMoodle,
  getAllMoodles,
  getMoodleBySlug,
  updateMoodle,
  deleteMoodle
};
