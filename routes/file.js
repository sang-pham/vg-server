const express = require("express");
const { fileController } = require("../controllers");
const router = new express.Router();
const { ApiResponse } = require("../libs");
const multer = require("multer");
var path = require("path");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.floor(Math.random() * 100000) + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

const { asyncHandle } = ApiResponse;

router.post("/upload", upload.single("file"), asyncHandle(fileController.uploadFile));

router.post("/upload-multi", upload.array("files"), asyncHandle(fileController.uploadMultiFiles))

module.exports = router;
