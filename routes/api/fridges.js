const express = require("express");
const router = express.Router();
const fridgesCtrl = require("../../controllers/fridges");

const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
router.post("/", upload.single("photo"), fridgesCtrl.create);
router.get("/", fridgesCtrl.index);
router.delete("/:id", fridgesCtrl.delete);
router.put("/:id", fridgesCtrl.update);



/*---------- Protected Routes ----------*/

module.exports = router;
