import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar/NavBar";
import { ClerkProvider, auth, clerkClient } from "@clerk/nextjs";
import { CLERK_ORG_ID } from "@/utils/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guardian of Decks",
  description: "Trading Card Game seller",
};

export default async function RootLayout({ children }) {
  let isAdmin = true;
  const data = auth();
  if (data.userId) {
    const user = await clerkClient.users.getUser(data.userId);
    isAdmin = user.publicMetadata.isAdmin;
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
