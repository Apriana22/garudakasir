const express = require("express");
const router = express.Router();
const product = require("./../../controllers/ProductController")
const { uploadFile } = require('../../middlewares/uploadFile')

router.get("/", product.getAll)
router.get("/brand/:brandId", product.getBrand)
router.get("/type/:typeId", product.getType)
router.get("/:id", product.getOne)
router.post("/", product.post,uploadFile("image"))
router.delete("/:id", product.deleteOne)
router.put('/:id', product.update,uploadFile("image"))
router.post('/stok', product.addStockQuantity)

module.exports = router;