"use client";

import React, { useState, useEffect } from "react";

interface LoadingComponentProps {
  loading: number;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ loading }) => {
  const [indiaDate, setIndiaDate] = useState("");
  const [indiaTime, setIndiaTime] = useState("");

  useEffect(() => {
    // Function to update the date and time for India
    const updateDateTime = () => {
      const indiaLocale = "en-IN"; // Indian locale
      const indiaTimeZone = "Asia/Kolkata"; // Indian timezone

      const now = new Date();
      const indiaDateTime = new Intl.DateTimeFormat(indiaLocale, {
        timeZone: indiaTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(now);

      const formattedDate = `${indiaDateTime[4].value}:${indiaDateTime[2].value}:${indiaDateTime[0].value}`;
      const formattedTime = `${indiaDateTime[6].value}:${indiaDateTime[8].value}:${indiaDateTime[10].value}`;

      setIndiaDate(formattedDate);
      setIndiaTime(formattedTime);
    };

    updateDateTime();
    const dateTimeInterval = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(dateTimeInterval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black text-white font-mono">
      <div className="absolute bottom-10 left-4 text-sm md:bottom-8 md:left-8 lg:bottom-6 lg:left-12">
        <p className="text-4xl font-bold mb-2 lg:text-5xl md:text-4xl sm:text-3xl">
          {loading}
        </p>
        <div className="mb-2 space-y-1 lg:space-y-2">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">{indiaDate}</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">{indiaTime}</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">
            28.4744&lsquo;N / 77.5040&lsquo;E
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">Greater Noida</p>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">Shubham Kumar</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
