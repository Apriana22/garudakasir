const express = require("express");
const router = express.Router();
const auth = require("./../../controllers/AuthController")
const config = require('../../../../config/config.json')

router.get("/", auth.logout)

module.exports = router;