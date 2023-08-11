import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-grey py-4">
      <ul className="flex justify-center space-x-4">
        <li className="text-white hover:text-grey">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="text-white hover:text-grey">
          <Link href="/">Home</Link>
        </li>
        <li className="text-white hover:text-grey">
          <Link href="/Form">New Product</Link>
        </li>
      </ul>
    </div>
  );
}
