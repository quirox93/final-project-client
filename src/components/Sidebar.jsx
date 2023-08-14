"use client";
import { CgMenuGridO, CgCardClubs } from "react-icons/cg";
import { TbChartInfographic } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { Link, Avatar, User } from "@nextui-org/react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen relative bg-gray-100 max-md:w-20 transition-all">
      {/* Title */}

      <div className="left-[32px] top-[32px] absolute text-slate-900 text-2xl font-bold max-md:hidden">
        Dashboard
      </div>

      {/* users Date */}

      <div className="left-[32px] top-[95px] absolute justify-start items-center gap-4 inline-flex">
        <Avatar
          isBordered
          color="primary"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
        <div className="flex-col justify-start items-start inline-flex max-md:hidden">
          <div className="text-slate-900 text-base font-bold">Héctor Gómez</div>
          <div className="text-lime-500 text-xs font-normal">Product Designer</div>
        </div>
      </div>

      {/* Division */}

      <div className="w-48 h-px left-[32px] top-[179px] absolute bg-slate-300 max-md:w-6 transition-all" />

      <div className="left-[32px] top-[208px] absolute flex-col justify-start items-start gap-10 inline-flex transition-all">
        {/* Links */}

        <Link href="/dashboard/products" color="Primary">
          <CgMenuGridO className="mr-4"/>
          <div className="max-md:hidden">Products</div>
        </Link>

        <Link href="/dashboard/addProduct" color="Primary">
          <CgCardClubs className="mr-4" />
          <div className="max-md:hidden">Add Product</div>
        </Link>

        <Link href="/dashboard/statistics" color="Primary">
          <TbChartInfographic className="mr-4" />
          <div className="max-md:hidden">Statistics</div>
        </Link>

        <Link href="/" color="Primary">
          <BiLogOut className="mr-4" />
          <div className="max-md:hidden">Login Out</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
