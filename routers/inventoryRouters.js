const express = require("express");
const { inventoryControllers } = require("../controllers");
const router = express.Router();

router.get("/getinventory", inventoryControllers.getInventory);
router.post("/addinventory", inventoryControllers.addInventory);
router.put("/editinventory/:id", inventoryControllers.editInventory);
router.delete("/deleteinventory/:id", inventoryControllers.deleteInventory);
module.exports = router;
