const express = require("express");
const MenuController = require("../controller/MenuController");
const router = express.Router();
const Authorize = require("../middleware/Authorize");

router.get("/", MenuController.findAllMenu);
router.post("/", MenuController.postMenu);
router.delete("/:id", MenuController.deleteMenu);
router.put("/:id", MenuController.updateMenu);

router.post("/order", MenuController.addOrder);
router.get("/order", MenuController.findOrder);
router.put("/order/:id", MenuController.updateOrder);
router.patch("/order/status/:id", Authorize, MenuController.updateStatusOrder);

module.exports = router;
