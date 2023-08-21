"use client";

import { useState, useEffect } from "react";

const DateTime = () => {
  const currentDate = new Date().toDateString();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div>{currentDate}</div>
      <div>{currentTime}</div>
    </>
  );
};

export default DateTime;
