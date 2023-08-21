'use client'

import { Tabs, Tab } from "@nextui-org/react";
import { BsFillBarChartFill } from "react-icons/bs";
import { HiOutlineChartPie } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";

import StatsBar from "./StatsBar";
import PieChart from "./PieChart";
import Linechart from "./Linechart";

const StatisticsBar = () => {
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-6 border rounded-lg bg-white">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
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
          <div className=" lg:h-[60vh] h-[40vh] ">
            <StatsBar />
          </div>
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
          <div className=" lg:h-[60vh] h-[40vh] ">
            <Linechart />
          </div>
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
          <div className=" lg:h-[60vh] h-[40vh] ">
            <PieChart />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default StatisticsBar;
