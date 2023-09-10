"use client";
import { HiShoppingBag } from "react-icons/hi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import CalElapsedTime from "../DashOrders/CalElapsedTime.jsx";

const RecentOrders = ({ orders }) => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {orders
          .map((order, id) => {
            return (
              <Popover placement="right-end" key={id} color={"primary"}>
                <PopoverTrigger className=" w-full bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2">
                  <Button className="flex justify-start h-unit-2xl ">
                    <div className="bg-purple-100 rounded-lg p-3">
                      <HiShoppingBag className="text-purple-800" />
                    </div>
                    <div className="pl-4">
                      <p className="text-gray-800 font-bold">
                        ${parseFloat(order.total.toFixed(2))}
                      </p>
                      <p className="text-gray-400 text-sm">{order.name}</p>
                    </div>
                    <div className="lg:flex md:hidden absolute right-6 text-sm">
                      <CalElapsedTime
                        time={order.createdAt}
                        format={"orderTime"}
                      />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold capitalize">
                      {order.name}{" "}
                    </div>
                    <div className="text-tiny">
                      The order is <b>{`${order.statusMp}`}</b>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })
          .reverse()
          .slice(0, 12)}
      </ul>
    </div>
  );
};

export default RecentOrders;
