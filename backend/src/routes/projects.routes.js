const express = require("express");
const { authRequired } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const ctrl = require("../controllers/projects.controller");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

// admin
router.post("/", authRequired, upload.single("image"), ctrl.create);
router.put("/:id", authRequired, upload.single("image"), ctrl.update);
router.delete("/:id", authRequired, ctrl.remove);

module.exports = router;
