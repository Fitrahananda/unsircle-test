const express = require("express");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

const user = require("./user");
const menu = require("./menu");

router.use("/user", user);
router.use(Authentication);
router.use("/menu", menu);

module.exports = router;
