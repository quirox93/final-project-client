import React from "react";
import {
  RecentOrders,
  StatisticsBar,
  TopCard,
} from "@/components/DashStatistics/index.js";

const statisticsPage = () => {
  return (
    <>
      <TopCard />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <StatisticsBar />
        <RecentOrders />
      </div>
    </>
  );
};

export default statisticsPage;
