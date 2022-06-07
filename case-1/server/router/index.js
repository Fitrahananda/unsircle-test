const express = require("express");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

const user = require("./user");
const company = require("./company");
const transaction = require("./transaction");
const item = require("./item");

router.use("/user", user);
router.use(Authentication);
router.use("/company", company);
router.use("/item", item);
router.use("/transaction", transaction);

module.exports = router;
