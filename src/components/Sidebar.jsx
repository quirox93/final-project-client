"use client";
import { RxDashboard } from "react-icons/rx";
import { VscGraph } from "react-icons/vsc";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

import { Link, Avatar, User, Divider } from "@nextui-org/react";
import DateTime from "./DateTime";
import NextLink from "next/link";
const Sidebar = ({ Children }) => {
  return (
    <div className="flex">
      <div className=" fixed h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between transition-all">
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className=" text-slate-900 text-2xl font-bold max-md:hidden ">
            Dashboard
          </div>
          {/* users Date */}
          <div className="justify-start items-center gap-4 inline-flex">
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
          </div>
          {/* Divider */}
          <Divider className="my-2" />
          {/* Links */}
          <div className="flex flex-col items-center gap-8">
            <Link as={NextLink} href="/dashboard/products" color="Primary">
              <RxDashboard size={20} className="mr-6 max-md:mr-0" />
              <div className=" max-md:hidden transition-all">Products</div>
            </Link>
            <Link as={NextLink} href="/dashboard/statistics" color="Primary">
              <VscGraph size={20} className="mr-6 max-md:mr-0" />
              <div className="max-md:hidden">Statistics</div>
            </Link>
            <Link as={NextLink} href="/dashboard/orders" color="Primary">
              <BiShoppingBag size={20} className="mr-6 max-md:mr-0" />
              <div className="mr-5 max-md:hidden">Orders</div>
            </Link>
            <Link as={NextLink} href="/dashboard/users" color="Primary">
              <AiOutlineUser size={20} className="mr-6 max-md:mr-0" />
              <div className="mr-7 max-md:hidden">Users</div>
            </Link>
          </div>
        </div>
      </div>
      <main className=" ml-52 w-full max-md:ml-20">{Children}</main>
    </div>
  );
};

export default Sidebar;
