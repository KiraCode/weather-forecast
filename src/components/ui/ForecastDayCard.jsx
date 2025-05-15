import React from "react";
import moment from "moment";
import { weatherCodesMapping } from "../../utils";

export default function ForecastDayCard({ dayData, day, lastDay }) {
  return (
    <div
      className={`flex items-center single-day justify-between ${
        lastDay ? "border-0" : ""
      }`}
    >
      <p style={{ width: "27%" }}>{moment(day).format("dddd")}</p>
      <img
        src={weatherCodesMapping[dayData.weatherCode].img}
        width={48}
        height={48}
      />
      <div
        style={{ width: "62%", marginLeft: "12px" }}
        className="flex items-center justify-between"
      >
        <p className="capitalize">{dayData.weatherCondition}</p>
        <p>
          {Math.floor(dayData.temperature2mMin)}-
          {Math.floor(dayData.temperature2mMax)}°C
        </p>
      </div>
    </div>
  );
}
