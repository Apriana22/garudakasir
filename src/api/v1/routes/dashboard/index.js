const express = require("express");
const router = express.Router();

const dashboard = require("./../../controllers/DashboardController")


router.get("/populer", dashboard.getFrequent)
router.get("/search", dashboard.getSearch)
router.get("/slider", dashboard.getSlider)


module.exports = router;