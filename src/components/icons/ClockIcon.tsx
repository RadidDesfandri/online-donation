"use client";

import { useEffect, useState } from "react";
import { MdOutlineNightlight } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";

const ClockIcon = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const isNight = hours >= 19 || hours < 5;

  if (!isClient) return null;

  return (
    <div className="flex items-center gap-2 text-white">
      <button type="button" className="rounded-full bg-[#1C1B1B] p-1">
        {isNight ? <MdOutlineNightlight /> : <IoSunnyOutline />}
      </button>
      <span className="text-xs font-medium">{formattedTime}</span>
    </div>
  );
};

export default ClockIcon;
