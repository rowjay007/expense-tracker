import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
