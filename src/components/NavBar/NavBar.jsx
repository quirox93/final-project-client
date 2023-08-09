
import Link from "next/link";
export default function NavBar() {
    return (  
        <div>
            <ul>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/">home</Link>
                </li>

                <li>
                  <Link href="/Form">New Product</Link>
                </li>

            </ul>
        </div>
    );
}

