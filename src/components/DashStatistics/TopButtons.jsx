"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

const TopButtons = ({ ordersDate, title }) => {
  const previusDate = (currentSales, previouSales) => {
    if (previouSales === 0) {
      return 0;
    }
    return parseFloat(
      (((currentSales - previouSales) / previouSales) * 100).toFixed(0)
    );
  };

  const previousDate = previusDate(ordersDate.date, ordersDate.previous);
  return (
    <Popover showArrow={true} placement="bottom" offset={20}>
      <PopoverTrigger>
        <Button
          size="md"
          className={
            ordersDate.date > ordersDate.previous
              ? "bg-blue-200 h-full text-blue-600 text-lg "
              : " bg-danger-200 h-full text-danger-600 text-lg "
          }
        >
          {ordersDate.date > ordersDate.previous
            ? `+${previousDate}%`
            : `${previousDate}%`}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">{title}</div>
          <div className="text-tiny">{`$ ${new Intl.NumberFormat([
            "ban",
            "id",
          ]).format(ordersDate.previous)}`}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default TopButtons;
