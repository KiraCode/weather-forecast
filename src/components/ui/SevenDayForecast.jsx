import React from "react";
import CardLayout from "./CardLayout";
import moment from "moment";
import { weatherCodesMapping } from "../../utils";

export default function SevenDayForecast({ dailyForecast }) {
  return (
    <CardLayout className={`seven-day-forecast-card-layout`}>
      <div
        style={{
          borderRadius: "10px",
          padding: "5px 10px",
          backgroundColor: " rgba(0, 0, 0, 0.2)",
          border: "1px solid #fff",
        }}
      >
        <p className="label-18 single-day" style={{ fontSize: "25px" }}>
          7 DAY FORECAST
        </p>
        {Object.keys(dailyForecast)?.length > 0 &&
          Object.keys(dailyForecast).map((day, dayInd) => {
            return (
              <DayForecast
                dayData={dailyForecast[day]}
                day={day}
                key={dayInd}
                lastDay={dayInd === 6 ? true : false}
              />
            );
          })}
      </div>
    </CardLayout>
  );
}

function DayForecast({ dayData, day, lastDay }) {
  return (
    <div
      className={`flex items-center single-day justify-between ${
        lastDay ? "border-0" : ""
      }`}
    >
      <p style={{ width: "27%" }}>{moment(day).format("dddd")}</p>
      <img
        src={weatherCodesMapping[dayData.weatherCode].img}
        alt="weather data"
        width={48}
        height={48}
      />
      <div
        style={{ width: "62%", marginLeft: "12px" }}
        className="flex items-center justify-between "
      >
        <p className="capitalize">{dayData.weatherCondition}</p>
        <p>
          {Math.floor(dayData.temperature2mMin)} -{" "}
          {Math.floor(dayData.temperature2mMax)} ℃
        </p>
      </div>
    </div>
  );
}
