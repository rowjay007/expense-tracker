import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if user with the same email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create a new user using Prisma
      const newUser = await prisma.user.create({
        data: {
          email,
          password, // Don't forget to hash the password!
        },
      });

      // Return a 201 status code and the new user's ID if created successfully
      res.status(201).json({ id: newUser.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(404).send();
  }
}
