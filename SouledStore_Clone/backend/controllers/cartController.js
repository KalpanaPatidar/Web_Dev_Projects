const prisma = require("../utils/prisma");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    // Basic validation
    if (!userId || !productId || !quantity || !size) {
      return res.status(400).json({
        message: "userId, productId, quantity and size are required",
      });
    }

    // Check whether product exists
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find user's cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(userId),
        },
      });
    }

    // Check whether same product + same size is already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_size: {
          cartId: cart.id,
          productId: Number(productId),
          size: size,
        },
      },
    });

    let cartItem;

    if (existingItem) {
      // Increase quantity
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + Number(quantity),
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          size: size,
          quantity: Number(quantity),
        },
      });
    }

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add product to cart",
    });
  }
};
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: {
        userId: Number(userId),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};

const updateCartItem= async(req,res)=>{
  try{
    const{itemId}=req.params;
    const {quantity}=req.body;
    if (!quantity || Number(quantity) < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }
        const cartItem = await prisma.cartItem.update({
      where: {
        id: Number(itemId),
      },
      data: {
        quantity: Number(quantity),
      },
    });

    res.status(200).json({
      message: "Cart quantity updated",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update cart quantity",
    });
  }
}
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: Number(itemId),
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(itemId),
      },
    });

    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove product from cart",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
    removeCartItem
};