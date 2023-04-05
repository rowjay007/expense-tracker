"use client"
import { useState } from 'react';
import firebase from '../firebase';
import { useRecoilState } from 'recoil';


import Form from '../components/Form';
import { isLoggedInState } from '@/utils/state';


async function handleSubmitLogin(email: string, password: string) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  } catch (error) {
    console.error(error);
  }
}

async function handleSubmitRegister(
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (user) {
      await user.sendEmailVerification();
      await firebase.firestore().collection("users").doc(user.uid).set({
        email: user.email,
      });
      setIsLoggedIn(true);
      setShowRegisterModal(false);
    }
  } catch (error) {
    console.error(error);
  }
}


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginModal = () => setShowLoginModal(!showLoginModal);
  const handleRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the expense app project
      </h1>
      <h3 className="text-xl font-medium mb-8">
        Experience a new way to track expenses
      </h3>
      {!isLoggedIn && (
        <>
          <button className="mr-4" onClick={handleLoginModal}>
            Login
          </button>
          <button onClick={handleRegisterModal}>Register</button>
        </>
      )}
      {isLoggedIn && (
        <>
          <p>Welcome back!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <Form
        title="Login"
        isVisible={showLoginModal}
        onClose={handleLoginModal}
        submitButtonText="Login"
        onSubmit={handleSubmitLogin}
      />
      <Form
        title="Register"
        isVisible={showRegisterModal}
        onClose={handleRegisterModal}
        submitButtonText="Register"
        onSubmit={handleSubmitRegister}
      />
    </div>
  );
}