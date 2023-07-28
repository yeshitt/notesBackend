const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/userController");

//creating a router object
const router = express.Router();

//Create user || POST
router.post("/register", registerController);

//Login user || POST
router.post("/login", loginController);

module.exports = router;
