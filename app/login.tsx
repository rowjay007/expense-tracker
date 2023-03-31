// pages/login.tsx

import Head from "next/head";
import LoginModal from "../components/Auth/LoginModal";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login | Expense Tracker</title>
      </Head>
      <LoginModal />
    </>
  );
};

export default LoginPage;
