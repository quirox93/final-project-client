import { salesOrders, getCurrentDate } from "./utils";
import TopButtons from "./TopButtons";
const TopCard = ({ orders }) => {
  const dataTime = getCurrentDate();
  const ordersDate = salesOrders(
    orders,
    dataTime.day,
    dataTime.month,
    dataTime.year
  );
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className=" text-2xl font-bold">{`$ ${new Intl.NumberFormat([
            "ban",
            "id",
          ]).format(ordersDate.TotalDay.date)}`}</p>
          <p className=" text-gray-600">Daily Revenue</p>
        </div>
        <TopButtons
          ordersDate={ordersDate.TotalDay}
          title={"Previous day's sales"}
        />
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{`$ ${new Intl.NumberFormat([
            "ban",
            "id",
          ]).format(ordersDate.TotalMonth.date)}`}</p>
          <p className=" text-gray-600">Monthly income</p>
        </div>
        <TopButtons
          ordersDate={ordersDate.TotalMonth}
          title={"Last month's sales"}
        />
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{`$ ${new Intl.NumberFormat([
            "ban",
            "id",
          ]).format(ordersDate.TotalYear.date)}`}</p>
          <p className=" text-gray-600">Annual income</p>
        </div>
        <TopButtons
          ordersDate={ordersDate.TotalYear}
          title={"Last year's sales"}
        />
      </div>
    </div>
  );
};

export default TopCard;
