const express = require("express");
const { fileController } = require("../controllers");
const router = new express.Router();
const { ApiResponse } = require("../libs");
const multer = require("multer");
var path = require("path");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/linkdv/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

const { asyncHandle } = ApiResponse;

router.post("/upload", upload.single("file"), asyncHandle(fileController.uploadFile));

module.exports = router;
