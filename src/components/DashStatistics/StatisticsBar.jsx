"use client";
import React, { useState } from "react";
import StatsBar from "./StatsBar";
import { Tabs, Tab } from "@nextui-org/react";
import { BsFillBarChartFill } from "react-icons/bs";
import { HiOutlineChartPie } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";

const StatisticsBar = () => {
  const [selected, setSelected] = useState("Bars");
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-6 border rounded-lg bg-white">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="Bars"
          title={
            <div className="flex items-center space-x-2">
              <BsFillBarChartFill />
              <span>Bars</span>
            </div>
          }
        >
          <StatsBar />
        </Tab>
        <Tab
          key="Lines"
          title={
            <div className="flex items-center space-x-2">
              <FaChartLine />
              <span>Lines</span>
            </div>
          }
        >
          Barra Line
        </Tab>
        <Tab
          key="Circular"
          title={
            <div className="flex items-center space-x-2">
              <HiOutlineChartPie />
              <span>Circular</span>
            </div>
          }
        >
          Barra circular
        </Tab>
      </Tabs>
    </div>
  );
};

export default StatisticsBar;
