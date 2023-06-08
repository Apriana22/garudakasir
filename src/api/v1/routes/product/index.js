const express = require("express");
const router = express.Router();
const product = require("./../../controllers/ProductController")
const { uploadFile } = require('../../middlewares/uploadFile')

router.get("/", product.getAll)
router.get("/brand/:brandId", product.getBrand)
router.get("/type/:typeId", product.getType)
router.get("/:id", product.getOne)
router.post("/", uploadFile("image"),product.post)
router.delete("/:id", product.deleteOne)
router.put('/:id', uploadFile("image"),product.update)
router.post('/stok', product.addStockQuantity)

module.exports = router;