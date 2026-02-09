const express = require("express");
const { authRequired } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const ctrl = require("../controllers/blog.controller");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/:slug", ctrl.getBySlug);

// admin
router.post("/", authRequired, upload.single("cover"), ctrl.create);
router.put("/:id", authRequired, upload.single("cover"), ctrl.update);
router.delete("/:id", authRequired, ctrl.remove);

module.exports = router;
