import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});