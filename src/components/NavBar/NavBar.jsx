"use client";
import NextLink from "next/link";
import Image from "next/image";
import ShopCartIcon from "../ShopCartIcon";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/LogoGod.svg";
export default function NavBar() {
  const path = usePathname();

  const { isSignedIn } = useUser();
  const loginButton = isSignedIn ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <SignInButton mode="modal">
      <Button as={NextLink} color="primary" href="#" variant="flat">
        Login
      </Button>
    </SignInButton>
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard/products" },
    { name: "Contact", path: "" },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={logo} width={200} alt="GOD" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={NextLink} color={path !== "/" && "foreground"} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            href="/dashboard/products"
            color={path !== "/dashboard/products" && "foreground"}
            aria-current="page"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            color={path !== "/contact" && "foreground"}
            href="#"
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>{<ShopCartIcon />}</NavbarItem>
        <NavbarItem>{loginButton}</NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              as={NextLink}
              color={path !== item.path && "foreground"}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
