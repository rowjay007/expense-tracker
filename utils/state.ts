import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const currentUserState = atom({
  key: "currentUserState",
  default: null,
});
