import { atom } from "recoil";

export interface User {
  email: string;
  name: string;
  id: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: false,
});
