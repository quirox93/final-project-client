import { dataBuy } from "./data";
import { FaShoppingBag } from "react-icons/fa";

const OrdersBack = () => {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Order</span>
          <span className=" sm:text-left text-right">Status</span>
          <span className="hidden md:grid">Last Order</span>
          <span className="hidden sm:grid">Payment</span>
        </div>
        <ul>
          {dataBuy.map((order, id) => {
            return (
              <li
                key={id}
                className=" bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className=" bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className=" text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">${order.name.first}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span
                    className={
                      order.status == "Success"
                        ? " bg-green-200 p-2 rounded-lg"
                        : order.status == "Pending"
                        ? " bg-orange-200 p-2 rounded-lg"
                        : " bg-red-200 p-2 rounded-lg"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className=" hidden md:flex">{order.date}</p>
                <div className=" sm:flex hidden justify-between items-center">
                  <p>{order.payment}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrdersBack;
