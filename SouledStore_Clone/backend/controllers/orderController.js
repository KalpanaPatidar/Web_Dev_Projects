const prisma = require("../utils/prisma");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    // 1. Find user's cart
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

    // 2. Check whether cart has items
    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 3. Calculate total
    const totalAmount = cart.items.reduce(
      (total, item) =>
        total +
        Number(item.product.price) * item.quantity,
      0
    );

    // 4. Create Order
    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        totalAmount: totalAmount,

        // Create OrderItems at the same time
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            price: item.product.price,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    // 5. Clear cart after successful order
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    // 6. Send response
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};
module.exports = {
  createOrder,
  getUserOrders,
};