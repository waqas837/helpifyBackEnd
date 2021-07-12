const express = require("express");
const router = express.Router();
const upload = require("../Middleware/imgUpload");
const addcontroller = require("../Controller/AddController");
const Auth = require("../Middleware/Auth");

router.post(
  "/createAdd/:id",
  upload.fields([
    { name: "uploadedImages1" },
    { name: "uploadedImages2" },
    { name: "uploadedImages3" },
    { name: "uploadedImages4" },
    { name: "uploadedImages5" },
    { name: "uploadedImages6" },
  ]),
  addcontroller.newAdd
);
router.route("/findUserTest/:id").get(addcontroller.findOutTestdata);
module.exports = router;
