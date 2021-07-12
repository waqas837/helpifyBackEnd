const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const upload = require("../Middleware/imgUpload");
const Auth = require("../Middleware/Auth");

router.route("/signup").post(userController.newuser);
router.route("/login").post(userController.loginUser);
// router.post("/forgotpassword", Auth, userController.forgotEmail);
// router.post("/resetpassword",)
module.exports = router;
