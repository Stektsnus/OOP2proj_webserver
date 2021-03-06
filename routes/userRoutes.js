const express = require("express"); 
const userController = require("../controllers/userController.js")
const router = express.Router();


router.post("/login", userController.logIn);
router.post("/signup", userController.signUp);
router.get("/show", userController.show)

module.exports = router;
