
import { RecentOrders, StatisticsBar, TopCard } from "./index";
import { getAllOrders } from "@/utils/api.js";
import { formatOrders } from "./utils";
const loaderOrdes = async () => await getAllOrders();
const Statistics = async () => {
  const dataBuy = formatOrders(await loaderOrdes());
  
  return (
    <>
      <TopCard orders={dataBuy}/>
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <StatisticsBar orders={dataBuy}/>
        <RecentOrders orders={dataBuy}/>
      </div>
    </>
  );
};

export default Statistics;
