const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/shop", shopController.getProducts);

router.get("/shop/:productCode", shopController.getProductPage);

module.exports = router;
