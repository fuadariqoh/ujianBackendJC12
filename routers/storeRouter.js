const express = require("express");
const { storeControllers } = require("../controllers");
const router = express.Router();

router.get("/getstore", storeControllers.getStore);
router.post("/addstore", storeControllers.addStore);
router.put("/editstore/:id", storeControllers.editStore);
router.delete("/deletestore/:id", storeControllers.deleteStore);

module.exports = router;
