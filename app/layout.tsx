import "./globals.css";
import { RecoilRoot } from "recoil";
import Layout from "@/components/Layout/Layout";



export interface AuthContextProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Expense Tracker",
  description: "An expense tracker for your daily expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <Layout>{children}</Layout>
        </RecoilRoot>
      </body>
    </html>
  );
}
