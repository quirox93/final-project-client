"use client";
import DashProducts from "@/components/DashProducts/DashProducts";
import FilterModal from "@/components/FilterModal";
import { Input } from "@nextui-org/react";

const DashSection = () => {
  return (
    <div className="my-2">
      <div className="flex  ml-20 gap-5 ">
        <Input size="md" className="w-72" type="email" label="Search" />
        <FilterModal />
        <FilterModal />
        <FilterModal />
      </div>
      <div className="flex mt-5 ml-20 w-auto">
        <DashProducts />
      </div>
    </div>
  );
};

export default DashSection;
