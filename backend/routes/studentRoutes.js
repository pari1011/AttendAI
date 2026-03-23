const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post("/", upload.single("image"), (req, res) => {
  const { name, class: studentClass } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO students (name, class, image)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, studentClass, image], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving student");
    }
    res.send("Student registered successfully");
  });
});

module.exports = router;