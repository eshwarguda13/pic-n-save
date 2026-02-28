const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload API
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ message: "File uploaded" });
});

// Get images API
app.get("/photos", (req, res) => {
  const files = fs.readdirSync("./uploads");
  res.json(files);
});

app.delete("/delete/:name", (req, res) => {
  const filePath = "./uploads/" + req.params.name;
  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
  }
  res.json({ message:"Deleted" });
});

app.listen(3000, () => console.log("Server running on 3000"));