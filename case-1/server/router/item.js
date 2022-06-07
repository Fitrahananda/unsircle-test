const express = require("express");
const ItemController = require("../controller/ItemController");
const router = express.Router();

router.post("/", ItemController.addItem);

router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
router.get("/", ItemController.findItem);

module.exports = router;
