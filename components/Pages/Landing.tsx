import Layout from "../components/Layout";
import { LoginModal, RegisterModal } from "../components/Auth";
import Button from "../components/UI/Button";

const Landing = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
        <div className="space-x-2 mb-6">
          <LoginModal>
            <Button>Login</Button>
          </LoginModal>
          <RegisterModal>
            <Button>Register</Button>
          </RegisterModal>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
