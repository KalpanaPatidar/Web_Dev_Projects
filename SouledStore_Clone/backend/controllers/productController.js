const prisma = require("../utils/prisma");

const getProducts = async (req, res) => {
  try {
    const {
      category,
      size,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Convert pagination values to numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Validate page and limit
    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1
    ) {
      return res.status(400).json({
        message: "Page must be a positive integer",
      });
    }

    if (
      !Number.isInteger(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > 100
    ) {
      return res.status(400).json({
        message: "Limit must be between 1 and 100",
      });
    }

    const where = {};

    // Category filter
    if (category) {
      where.category = {
        name: category,
      };
    }

    // Size filter
    if (size) {
      where.sizes = {
        some: {
          size: size,
        },
      };
    }

    // Price filter
    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price.gte = Number(minPrice);
      }

      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
    }

    // Search filter
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Sorting
    let orderBy = {
      createdAt: "desc",
    };

    if (sort === "price_asc") {
      orderBy = {
        price: "asc",
      };
    } else if (sort === "price_desc") {
      orderBy = {
        price: "desc",
      };
    } else if (sort === "newest") {
      orderBy = {
        createdAt: "desc",
      };
    } else if (sort) {
      return res.status(400).json({
        message:
          "Invalid sort. Use price_asc, price_desc, or newest",
      });
    }

    // Pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limitNumber,
      include: {
        category: true,
        sizes: true,
      },
    });

    // Count filtered products
    const totalProducts = await prisma.product.count({
      where,
    });

    const totalPages = Math.ceil(
      totalProducts / limitNumber
    );

    res.status(200).json({
      products,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalProducts,
        totalPages,
      },
    });
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

