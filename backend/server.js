const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});