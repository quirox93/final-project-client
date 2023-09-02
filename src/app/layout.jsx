import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar/NavBar";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { getUserById } from "@/utils/api";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guardian of Decks",
  description: "Trading Card Game seller",
};

export default async function RootLayout({ children }) {
  let isAdmin = false;
  const data = auth();
  if (data.userId) {
    try {
      const user = await getUserById(data.userId);
      isAdmin = user.dbData.isAdmin;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <html lang="en" className="light text-foreground bg-background">
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            <NavBar isAdmin={isAdmin} />
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
