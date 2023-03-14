import firebaseConfig from "@/config/firebaseConfig";
import { useState, useEffect } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  User,
} from "firebase/auth";

interface Firebase {
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

export const useFirebase = (): Firebase => {
  const [app, setApp] = useState<ReturnType<typeof getApp>>();
  const [auth, setAuth] = useState<Auth>();

  useEffect(() => {
    const existingApp = getApps().length > 0 ? getApp() : undefined;
    if (!existingApp) {
      const newApp = initializeApp(firebaseConfig);
      setApp(newApp);
      setAuth(getAuth(newApp));
    } else {
      setApp(existingApp);
      setAuth(getAuth(existingApp));
    }
  }, []);

  const registerUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth!, email, password);
  };

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth!, email, password);
  };

  const logoutUser = async () => {
    await signOut(auth!);
  };

  const getCurrentUser = async (): Promise<User | null> => {
    return new Promise((resolve) => {
      auth?.onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
  };
};
