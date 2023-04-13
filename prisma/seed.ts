import { PrismaClient, Category } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const passwordHash = await bcrypt.hash("password", 10);
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      passwordHash,
      firstName: "John",
      lastName: "Doe",
      expenses: {
        createMany: {
          data: [
            {
              title: "Lunch",
              description: "Had lunch with friends",
              amount: 15.0,
              category: Category.FOOD,
              date: new Date("2022-03-25T12:00:00Z"),
            },
            {
              title: "Movie",
              description: "Went to see a movie",
              amount: 10.0,
              category: Category.ENTERTAINMENT,
              date: new Date("2022-03-26T18:00:00Z"),
            },
          ],
        },
      },
    },
  });

  console.log(`Seeded user with email: ${user.email}`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
