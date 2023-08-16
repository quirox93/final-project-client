import Link from "next/link";
import ShopCartIcon from "../ShopCartIcon";

export default function NavBar() {
  return (
    <div className="flex   bg-primary text-primary-foreground py-2">
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
