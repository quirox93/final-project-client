import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar/NavBar";
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";
import { getUserById } from "@/utils/api";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guardian of Decks",
  description: "Trading Card Game seller",
};

export default async function RootLayout({ children }) {
  let isAdmin = false;
  const data = auth();
  let cart = null;
  if (data.userId) {
    try {
      const user = await getUserById(data.userId);
      isAdmin = user.dbData.isAdmin;

      const items = user.dbData.cart;
      cart = items.map((item) => {
        const { _id, description, imag, name, price, stock } = item._id;
        const res = {
          id: _id,
          description,
          name,
          price,
          stock,
          image: imag.secure_url,
          quantity: item.quantity,
        };
        return res;
      });
      console.log(cart);
      //dispatch(selectedProducts(cart));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <html lang="en" className="light text-foreground bg-background">
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            <NavBar isAdmin={isAdmin} cart={cart} />
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
