"use client";
import { RxDashboard } from "react-icons/rx";
import { VscGraph } from "react-icons/vsc";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

import { Link, Divider } from "@nextui-org/react";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ Children }) => {
  const pathname = usePathname();
  const url = pathname.split("/")[2];
  return (
    <div className="flex">
      <div className=" fixed h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between transition-all">
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className=" text-slate-900 text-2xl font-bold mt-5 max-sm:hidden">
            Dashboard
          </div>
          {/* users Date */}
          {/* <div className="justify-center items-center gap-4 inline-flex">
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
            <div className="flex-col justify-start items-start inline-flex max-md:hidden ">
              <div className="text-slate-900 text-base font-bold">
                Héctor Gómez
              </div>
              <div className="text-lime-500 text-xs font-normal ">
                <DateTime suppressHydrationWarning={true} />
              </div>
            </div>
          </div> */}
          {/* Divider */}
          <Divider className="my-0 max-sm:hidden" />
          {/* Links */}
          <div className="flex flex-col items-center gap-8 max-sm:mt-9">
            <Link
              isBlock
              as={NextLink}
              href="/dashboard/products"
              color={url === "products" ? "default" : "primary"}
              className={
                url === "products"
                  ? " text-danger-500 cursor-not-allowed"
                  : "primary"
              }
            >
              <RxDashboard size={20} className="mr-6 max-sm:mr-0" />
              <div className=" max-sm:hidden transition-all">Products</div>
            </Link>
            <Link
              isBlock
              as={NextLink}
              href="/dashboard/statistics"
              color={url === "statistics" ? "default" : "primary"}
              className={
                url === "statistics"
                  ? " text-danger-500 cursor-not-allowed"
                  : "primary"
              }
            >
              <VscGraph size={20} className="mr-6 max-sm:mr-0" />
              <div className="max-sm:hidden">Statistics</div>
            </Link>
            <Link
              isBlock
              as={NextLink}
              href="/dashboard/orders"
              color={url === "orders" ? "default" : "primary"}
              className={
                url === "orders"
                  ? " text-danger-500 cursor-not-allowed"
                  : "primary"
              }
            >
              <BiShoppingBag size={20} className="mr-6 max-sm:mr-0" />
              <div className="mr-5 max-sm:hidden">Orders</div>
            </Link>
            <Link
              isBlock
              as={NextLink}
              href="/dashboard/users"
              color={url === "users" ? "default" : "primary"}
              className={
                url === "users"
                  ? "text-danger-500 cursor-not-allowed"
                  : "primary"
              }
            >
              <AiOutlineUser size={20} className="mr-6 max-sm:mr-0" />
              <div className="mr-7 max-sm:hidden">Users</div>
            </Link>
          </div>
        </div>
      </div>
      <main className="ml-52 w-full max-sm:ml-20">{Children}</main>
    </div>
  );
};

export default Sidebar;
