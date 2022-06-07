const express = require("express");
const CompanyController = require("../controller/CompanyController");
const router = express.Router();

router.post("/", CompanyController.addCompany);

router.get("/", CompanyController.findCompany);
router.put("/:id", CompanyController.updateCompany);
router.delete("/:id", CompanyController.deleteCompany);

module.exports = router;
