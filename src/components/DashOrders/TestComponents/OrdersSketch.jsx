import { FaShoppingBag } from "react-icons/fa";
import { getAllOrders } from "@/utils/api";
import {CalElapsedTime} from "../CalElapsedTime";

const loadOrders = async () => await getAllOrders();

const OrdersSketch = async () => {
  const orders = await loadOrders();
  console.log(orders)
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
          {orders.map((order, id) => {
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
                      ${order.__v}
                    </p>
                    <p className="text-gray-800 text-sm">{order.payer.email}</p>
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
                <CalElapsedTime time={order.createdAt}/>
                <div className=" sm:flex hidden justify-between items-center">
                  {/* Agregar al modelo el metodo de pago (Por el momento solo Mercado Pago)  */}
                  <p>Mercado Pago</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrdersSketch;
