"use client";

import { useState, useEffect } from "react";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = new Date().toUTCString();
      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
 
  return <>{currentTime}</>;
};

export default DateTime;
