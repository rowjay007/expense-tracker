import { NextApiRequest, NextApiResponse } from "next";
import { FirebaseAuth } from "@firebase/auth-types";
import { firebaseAdmin } from "../../../lib/firebase-admin";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const auth: FirebaseAuth = firebaseAdmin.auth();
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid email or password." });
  }
};

export default login;
