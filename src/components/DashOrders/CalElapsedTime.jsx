"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import {monthNames} from "./data";

function calculateElapsedTime(fromDate) {
  
  const currentDate = new Date();
  const initialDate = new Date(fromDate);
  const timeElapsed = currentDate - initialDate;

  const elapsedMinutes = Math.floor(timeElapsed / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  
  const minutesRemaining = elapsedMinutes % 60;
  const daysPassed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const initialMonth = monthNames[initialDate.getMonth()];
  const elapsedHoursDays = Math.floor(elapsedHours - daysPassed * 24);
  const DayMonth = initialDate.getDate();
  const DayYear = initialDate.getFullYear();

  const LastOrder = () => {
    if (elapsedHours >= 24) {
      return `${daysPassed} Day ${elapsedHoursDays} H ${minutesRemaining} Min`;
    }
    if (elapsedHours >= 1 || elapsedHours < 24) {
      return `${elapsedHours} H ${minutesRemaining} Min`;
    }
    return `${minutesRemaining} Min`;
  };

 const dateFormat = (createdAt)=> {
    return new Date(createdAt).toGMTString("en-US");
  }
  return {
    orderTime: LastOrder(),
    date: `${DayMonth} ${initialMonth} ${DayYear}`,
    dateFull: dateFormat(fromDate)
  };
}

const CalElapsedTime = ({ time, format }) => {
  const timeElapsed = calculateElapsedTime(time);
  return (
    <Popover placement="top-start" showArrow={true}>
      <PopoverTrigger>
        <Button className="bg-transparent p-0">{timeElapsed[format]}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Date</div>
          <div className="text-tiny">{timeElapsed.date}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalElapsedTime;
