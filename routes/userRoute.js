const express = require("express");
const { getuser, postuser, deleteuser, updateuser } = require("../controller/userController");

const router = express.Router();

router.get("/getUser", getuser);
router.post("/postUser", postuser);
router.delete("/deleteUser/:id", deleteuser);
router.put("/updateUser/:id", updateuser);

module.exports = router;
