const express = require("express");
const {
  addToCart,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/:userId", getCart);

module.exports = router;