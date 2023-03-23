import { useAuth } from "../AuthProvider";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    return (
      <div>
        <p>Welcome, {currentUser.email}!</p>
        <button onClick={handleLogout}>Logout</button>
        {/* Add task, expense, and graph components here */}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm />
        <h2>Register</h2>
        <RegistrationForm />
      </div>
    );
  }
};

export default Dashboard;
