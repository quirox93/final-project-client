import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-primary text-primary-foreground py-4 ">
      <ul className="flex justify-center space-x-4">
        <li className="hover:text-primary-100">
          <Link href="/dashboard/products">Dashboard</Link>
        </li>
        <li className="hover:text-primary-100">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-primary-100">
          <Link href="/prodForm">New Product</Link>
        </li>
      </ul>
    </div>
  );
}
