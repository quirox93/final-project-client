import { RecentOrders, StatisticsBar, TopCard } from "./index";
import { getAllOrders } from "@/utils/api.js";
import { formatOrders } from "./utils";
import { data } from "autoprefixer";
const loaderOrdes = async () => await getAllOrders();
export default async function Statistics() {
  const dataBuy = formatOrders(await loaderOrdes());
  
  return (
    <>
      <TopCard orders={dataBuy} />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <StatisticsBar orders={dataBuy} />
        <RecentOrders orders={dataBuy} />
      </div>
    </>
  );
}
