const prisma = require("./utils/prisma");

async function main() {
  const users = await prisma.user.findMany();

  console.log(users);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });