import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* @ts-expect-error Server Component */}
        <Header />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
