const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* Serve frontend files (index.html, style.css, script.js) */
app.use(express.static(path.join(__dirname)));

/* Serve uploaded images */
app.use("/uploads", express.static("uploads"));

/* Storage setup for multer */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* Upload API */
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ message: "File uploaded" });
});

/* Get images API */
app.get("/photos", (req, res) => {
  const files = fs.readdirSync("./uploads");
  res.json(files);
});

/* Delete image API */
app.delete("/delete/:name", (req, res) => {
  const filePath = "./uploads/" + req.params.name;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  res.json({ message: "Deleted" });
});

/* Start server (Render uses dynamic port) */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});