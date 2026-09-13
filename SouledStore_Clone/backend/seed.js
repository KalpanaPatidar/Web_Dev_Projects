const prisma = require("./utils/prisma");

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const tshirts = await prisma.category.upsert({
    where: {
      name: "T-Shirts",
    },
    update: {},
    create: {
      name: "T-Shirts",
    },
  });

  const hoodies = await prisma.category.upsert({
    where: {
      name: "Hoodies",
    },
    update: {},
    create: {
      name: "Hoodies",
    },
  });

  const shirts = await prisma.category.upsert({
    where: {
      name: "Shirts",
    },
    update: {},
    create: {
      name: "Shirts",
    },
  });

  // Products
  await prisma.product.create({
    data: {
      name: "Marvel Superhero T-Shirt",
      description: "Premium cotton Marvel printed T-Shirt",
      price: 799,
      image: "https://example.com/marvel-tshirt.jpg",
      categoryId: tshirts.id,
      sizes: {
        create: [
          { size: "S" },
          { size: "M" },
          { size: "L" },
          { size: "XL" },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Oversized Graphic T-Shirt",
      description: "Comfortable oversized graphic T-Shirt",
      price: 999,
      image: "https://example.com/oversized.jpg",
      categoryId: tshirts.id,
      sizes: {
        create: [
          { size: "S" },
          { size: "M" },
          { size: "L" },
          { size: "XL" },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Classic Black Hoodie",
      description: "Warm and comfortable everyday hoodie",
      price: 1499,
      image: "https://example.com/black-hoodie.jpg",
      categoryId: hoodies.id,
      sizes: {
        create: [
          { size: "M" },
          { size: "L" },
          { size: "XL" },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Casual Printed Shirt",
      description: "Stylish printed casual shirt",
      price: 1299,
      image: "https://example.com/printed-shirt.jpg",
      categoryId: shirts.id,
      sizes: {
        create: [
          { size: "S" },
          { size: "M" },
          { size: "L" },
          { size: "XL" },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });