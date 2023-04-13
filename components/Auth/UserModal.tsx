import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useRecoilState } from "recoil";
import { userState } from "@/utils/state";

export default function UserModal() {

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row gap-2">
        <LoginModal />
        <RegisterModal />
      </div>
    </>
  );
}
