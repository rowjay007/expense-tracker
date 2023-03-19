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
        <>
          <div className="flex justify-center items-center flex-col md:flex-row gap-2">
            <LoginModal />
            <RegisterModal />
          </div>
        </>
      )}
    </>
  );
}
  