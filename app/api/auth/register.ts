import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../../services/authService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { name, email, password } = req.body;
    const token = await registerUser(name, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
