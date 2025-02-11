const express = require("express");
const { registerUser,loginUser,deleteUser } = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.delete('/delete/:id',auth,deleteUser)

module.exports = router;
