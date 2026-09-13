const prisma = require("../utils/prisma");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        sizes: true,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

module.exports = {
  getProducts,
};