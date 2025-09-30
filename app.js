const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const moodleRoutes = require("./routes/moodleRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(cors({
    origin: "http://localhost:3000", // alamat frontend kamu
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/moodles", moodleRoutes);

// Sync DB
sequelize.sync({ alter: true }) // auto update table kalau ada perubahan
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB Error:", err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
