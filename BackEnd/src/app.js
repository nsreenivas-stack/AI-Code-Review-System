const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

app.get("/test", (req, res) => {
  res.send("API working");
});

// 🔥 THIS MUST MATCH
const aiRoutes = require("./routes/ai.routes");
app.use("/ai", aiRoutes);

module.exports = app;
