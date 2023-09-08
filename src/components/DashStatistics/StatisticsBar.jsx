"use client";
import React, { useEffect } from "react";
import { Tabs, Tab, RadioGroup, Radio } from "@nextui-org/react";
import { BsFillBarChartFill } from "react-icons/bs";
import { HiOutlineChartPie } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import StatsBar from "./StatsBar";
import PieChart from "./PieChart";
import Linechart from "./Linechart";

import { dataStatsBar, weekDay, month } from "./utils";
const StatisticsBar = ({ orders }) => {
  const [selected, setSelected] = React.useState("day");
  const arrayDate = dataStatsBar(orders, selected);
  const date = arrayDate.map((item) => {
    if (selected === "day") {
      const currentDate = item.fecha.getDay();
      return weekDay[currentDate];
    }
    if (selected === "month") {
      return month[item.date - 1];
    }
    
    return item.date;
  });
  
  const value = arrayDate.map((item) => {
    return item.total;
  });
  
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-6 border rounded-lg bg-white">
      <div className="pb-4">
        <RadioGroup
          label="Select options"
          orientation="horizontal"
          value={selected}
          onValueChange={setSelected}
        >
          <Radio value="day">Day</Radio>
          <Radio value="month">Month</Radio>
          <Radio value="year">Year</Radio>
        </RadioGroup>
      </div>
      <div className="w-full">
        <Tabs aria-label="Options" color="primary" variant="bordered">
          <Tab
            key="Bars"
            title={
              <div className="flex items-center space-x-2">
                <BsFillBarChartFill />
                <span className="max-sm:hidden">Bars</span>
              </div>
            }
          >
            <div className="lg:h-[51vh] h-[35vh]  flex justify-center pb-5">
              <StatsBar
                date={date}
                title={
                  selected === "day"
                    ? "Daily Revenue"
                    : selected === "month"
                    ? "Monthly Income"
                    : "Annual Revenues"
                }
                value={value}
              />
            </div>
          </Tab>
          <Tab
            key="Lines"
            title={
              <div className="flex items-center space-x-2">
                <FaChartLine />
                <span className="max-sm:hidden">Lines</span>
              </div>
            }
          >
            <div className=" lg:h-[51vh] h-[35vh]  flex justify-center pb-5">
              <Linechart date={date}
                title={
                  selected === "day"
                    ? "Daily Revenue"
                    : selected === "month"
                    ? "Monthly Income"
                    : "Annual Revenues"
                }
                value={value}/>
            </div>
          </Tab>
          <Tab
            key="Circular"
            title={
              <div className="flex items-center space-x-2">
                <HiOutlineChartPie />
                <span className="max-sm:hidden">Circular</span>
              </div>
            }
          >
            <div className=" lg:h-[51vh] h-[35vh]  flex justify-center pb-5">
              <PieChart date={date}
                title={
                  selected === "day"
                    ? "Daily Revenue"
                    : selected === "month"
                    ? "Monthly Income"
                    : "Annual Revenues"
                }
                value={value}/>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default StatisticsBar;
