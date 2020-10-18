const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.createUser);
router.post("/create-user", userController.processCreateUser);

module.exports = router;
