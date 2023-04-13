import { atom, selector } from "recoil";
import { firebaseClient } from "./firebase";

export const userState = atom({
  key: "userState",
  default: null,
});

export const expensesState = selector({
  key: "expensesState",
  get: async ({ get }) => {
    const user = get(userState);
    if (!user) {
      return [];
    }
    const expensesRef = firebaseClient
      .firestore()
      .collection("expenses")
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc");
    const expensesSnapshot = await expensesRef.get();
    return expensesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
});
