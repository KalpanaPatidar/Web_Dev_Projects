const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/:userId", getCart);

router.patch("/:itemId", updateCartItem);

router.delete("/:itemId", removeCartItem);

module.exports = router;