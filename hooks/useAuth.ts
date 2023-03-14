import { authState } from "@/atoms/auth";
import { useRecoilState } from "recoil";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = (user: firebase.User) => {
    setAuth({ user, isLoggedIn: true });
  };

  const logout = () => {
    setAuth({ user: null, isLoggedIn: false });
  };

  return { auth, login, logout };
};
