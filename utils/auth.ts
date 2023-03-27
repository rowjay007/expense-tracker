// utils/auth.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(data: Record<string, any>): string {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): Record<string, any> {
  return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Record<string, any> | null> {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  try {
    const data = verifyToken(token);
    return data;
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return null;
  }
}
