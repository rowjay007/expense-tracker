import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Check if user with the given email exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a password reset token and save it in the database
      const resetToken = "some-random-token"; // TODO: Generate a random token
      await prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiresAt: new Date(Date.now() + 3600000), // Token expires in 1 hour
        },
      });

      // TODO: Send an email with the password reset link to the user's email address

      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(404).send();
  }
}
