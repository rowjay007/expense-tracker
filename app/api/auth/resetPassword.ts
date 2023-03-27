import { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "../../../services/authService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { email, newPassword } = req.body;
    await resetPassword(email, newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
