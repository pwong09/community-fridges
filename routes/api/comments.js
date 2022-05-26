const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/comments");

router.post("/fridges/:id/comments", commentsCtrl.create);
router.delete("/fridges/:id/comments", commentsCtrl.delete);
router.get("/fridges/:id/comments", commentsCtrl.index);

module.exports = router;