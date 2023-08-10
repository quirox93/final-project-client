import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-gray-900 py-4">
      <ul className="flex justify-center space-x-4">
        <li className="text-white hover:text-gray-300">
          <Link href="/dashboard">
           Dashboard
          </Link>
        </li>
        <li className="text-white hover:text-gray-300">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="text-white hover:text-gray-300">
          <Link href="/Form">
           New Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
