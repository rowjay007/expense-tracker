import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useRecoilState } from "recoil";
import { userState } from "@/utils/state";

export default function UserModal() {
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
          <div className="flex flex-col sm:flex-row">
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2 sm:mr-2">
    <LoginModal />
  </button>
  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md sm:ml-2">
    <RegisterModal />
  </button>
</div>

      )}
    </>
  );
}
