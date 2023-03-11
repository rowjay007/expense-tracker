import Navbar from "@/components/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello, World!!</h1>
        <Navbar/>
      </div>
    </main>
  );
}
