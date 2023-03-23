import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/auth/firebase';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       try {
         await signInWithEmailAndPassword(auth, email, password);
       } catch (error) {
         setError("Failed to sign in");
       }
     };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;