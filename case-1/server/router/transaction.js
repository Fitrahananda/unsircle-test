const express = require("express");
const TransactionController = require("../controller/TransactionController");
const router = express.Router();

router.post("/", TransactionController.addTransaction);

router.get("/", TransactionController.findTransaction);
router.put("/:id", TransactionController.updateTransaction);
router.delete("/:id", TransactionController.deleteTransaction);

module.exports = router;
