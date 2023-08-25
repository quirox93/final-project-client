import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar/NavBar";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { CLERK_ORG_ID } from "@/utils/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guardian of Decks",
  description: "Trading Card Game seller",
};

export default function RootLayout({ children }) {
  let isAdmin = false;
  const { sessionClaims } = auth();
  if (sessionClaims) isAdmin = Object.keys(sessionClaims?._orgs).includes(CLERK_ORG_ID);
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
