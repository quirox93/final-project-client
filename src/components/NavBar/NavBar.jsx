"use client";
import Link from "next/link";
import ShopCartIcon from "../ShopCartIcon";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn } = useUser();
  const login = isSignedIn ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <SignInButton mode="modal">
      <button className="btn">Sign in</button>
    </SignInButton>
  );

  return (
    <div className="flex   bg-primary text-primary-foreground p-2">
      {login}
      <ul className="flex space-x-4 mx-auto">
        <li className="hover:text-primary-100">
          <Link href="/dashboard/products">Dashboard</Link>
        </li>
        <li className="hover:text-primary-100">
          <Link href="/">Home</Link>
        </li>
      </ul>
      <ShopCartIcon />
    </div>
  );
}
