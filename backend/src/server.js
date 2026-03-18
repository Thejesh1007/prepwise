require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const generateRoutes = require("./routes/generate");
const historyRoutes = require("./routes/history");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "PrepWise API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/history", historyRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PrepWise server running on port ${PORT}`);
});