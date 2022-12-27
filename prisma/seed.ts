import { PrismaClient } from "@prisma/client";
import { links } from "../data";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name:"admin",
      role: "ADMIN",
    },
  });
  await prisma.website.createMany({
    data: links,
  });
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
