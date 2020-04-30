const express = require("express");
const { productControllers } = require("../controllers");
const router = express.Router();

router.get("/getproduct", productControllers.getProduct);
router.post("/addproduct", productControllers.addProduct);
router.put("/editproduct/:id", productControllers.editProduct);
router.delete("/deleteproduct/:id", productControllers.deleteProduct);

module.exports = router;
