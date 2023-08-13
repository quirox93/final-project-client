import DashProducts from "@/components/DashProducts";
import Sidebar from "@/components/Sidebar";
import HeaderDash from "@/components/HeaderDash";
import SearchBar from "@/components/SearchBar";

import FilterModal from "@/components/FilterModal";
// import SortNameButton from "@/components/SortNameButton";
// import SortPriceButton from "@/components/SortPriceButton";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1 w-32">
        <HeaderDash />
        <div className="my-8">
          <SearchBar />
          <div className="flex mt-10 justify-evenly my-8">
            <FilterModal />
            <FilterModal />
            <FilterModal />
          </div>
          <div className="flex justify-center">
            <DashProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
