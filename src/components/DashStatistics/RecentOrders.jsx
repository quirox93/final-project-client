"use client";
import { data } from "./data.js";
import { FaShoppingBag } from "react-icons/fa";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {data.map((order, id) => {
          return (
            <Popover placement="right-end" key={id} color={'primary'}>
              <PopoverTrigger className=" w-full bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2">
                <Button className="flex justify-start">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">${order.total}</p>
                    <p className="text-gray-400 text-sm">{order.name.first}</p>
                  </div>
                  <p className="lg:flex md:hidden absolute right-6 text-sm">
                    {order.date}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold capitalize">{`${order.name.first} ${order.name.last}`}</div>
                  <div className="text-tiny">purchase in <b>{`${order.status}`}</b></div>
                  <div className="text-tiny">payment method <b>{`${order.method}`}</b></div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentOrders;
