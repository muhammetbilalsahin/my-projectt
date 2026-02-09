const express = require("express");
const { authRequired } = require("../middleware/auth");
const ctrl = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", ctrl.submit);
router.get("/", authRequired, ctrl.list);

module.exports = router;
