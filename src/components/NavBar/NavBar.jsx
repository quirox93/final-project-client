"use client";
import NextLink from "next/link";
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
export default function NavBar() {
  const path = usePathname();

  const { isSignedIn } = useUser();
  const loginButton = isSignedIn ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <SignInButton mode="modal">
      <Button as={Link} color="primary" href="#" variant="flat">
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
          <p className="font-bold text-inherit">LOGO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={Link} color={path !== "/" && "foreground"} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={Link}
            href="/dashboard/products"
            color={path !== "/dashboard/products" && "foreground"}
            aria-current="page"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={Link} color={path !== "/contact" && "foreground"} href="#">
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
              as={Link}
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
