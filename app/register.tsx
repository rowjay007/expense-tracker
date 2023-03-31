// pages/register.tsx

import Head from "next/head";
import RegisterModal from "../components/Auth/RegisterModal";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register | Expense Tracker</title>
      </Head>
      <RegisterModal />
    </>
  );
};

export default RegisterPage;
