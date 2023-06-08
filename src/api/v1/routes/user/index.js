const express = require("express");
const router = express.Router();
const user = require("../../controllers/UserControllers")
const { uploadFile } = require('../../middlewares/uploadFile')

router.put('/updateProfile', user.updateProfile)
router.put('/updatePP', uploadFile("image"),user.updatePP, )
router.get("/profile", user.profile)

router.get("/", user.getAll)
router.get("/:id", user.getOne)
router.post("/", user.post)
router.delete("/:id", user.deleteOne)
router.put('/:id', user.update)

module.exports = router;