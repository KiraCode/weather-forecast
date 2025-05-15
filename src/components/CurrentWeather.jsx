import React from "react";
import CardLayout from "./ui/CardLayout";
import Temperature from "../assets/images/temperature.svg";
import Eye from "../assets/images/eye.svg";
import ThermoMini from "../assets/images/temperature-mini.svg";
import Windy from "../assets/images/windy.svg";
import Water from "../assets/images/water.svg";

import HourlyForecast from "./ui/HourlyForecast";
import SevenDayForecast from "./ui/SevenDayForecast";
import moment from "moment";
import { weatherCodesMapping } from "../utils";

export default function CurrentWeather({
  currentWeatherData,
  forecastLocation,
  dailyForecast,
  hourlyForecastData,
}) {
  return (
    <>
      <div className="home-main-div">
        <div className="default-home-container">
          <CardLayout>
            {currentWeatherData?.length && currentWeatherData[0] && (
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                {/* Place, Sunny, Day and Date */}
                <div className="default-card-city">
                  <img
                    src={
                      weatherCodesMapping[
                        currentWeatherData[0]?.value?.weatherCode
                      ].img
                    }
                    alt="Sunny"
                    style={{ width: "70px", height: "70px" }}
                  />
                  <div>
                    <p className="city-name">{forecastLocation?.label}</p>
                    <p className="date-today">
                      {moment(currentWeatherData[0].date).format(
                        "ddd DD/MM/YYYY"
                      )}
                    </p>
                    <p>{moment().format("MMMM Do YYYY")}</p>
                  </div>
                </div>

                {/* Temp container */}
                <div className="temp-container">
                  <img src={Temperature} alt="thermometer image" />
                  <div>
                    <p style={{ fontSize: "144px" }}>
                      {parseFloat(
                        currentWeatherData[0].value.temperature2m
                      ).toFixed(0)}
                    </p>
                    <p className="text-capitalize">
                      {currentWeatherData[0].value?.weatherCondition}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "24px",
                      alignSelf: "start",
                      paddingTop: "45px",
                    }}
                  >
                    ℃
                  </p>
                </div>

                {/* Visibility and feels like */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "60px",
                    width: "100%",
                    columnGap: "16px",
                  }}
                >
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={Eye} alt="" />
                      <p className="weather-params-label">Visibility</p>
                    </div>
                    <p>
                      {Math.floor(
                        currentWeatherData[0].value?.visibility / 1000
                      )}{" "}
                      km
                    </p>
                  </div>
                  <p>|</p>
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={ThermoMini} alt="" />
                      <p className="weather-params-label">Feels like</p>
                    </div>
                    <p>
                      {Math.floor(
                        currentWeatherData[0].value.apparentTemperature
                      )}
                      ℃
                    </p>
                  </div>
                </div>

                {/* Humidity and Wind */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "24px",
                    width: "100%",
                    columnGap: "16px",
                    marginBottom:"34px"
                  }}
                >
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={Water} />
                      <p className="weather-params-label">Humidity</p>
                    </div>
                    <p>{currentWeatherData[0].value?.humidity}%</p>
                  </div>
                  <p>|</p>
                  <div
                    className="weather-info-subtile"
                    style={{ marginLeft: "0px" }}
                  >
                    <div className="flex">
                      <img src={Windy} />
                      <p className="weather-params-label">Wind</p>
                    </div>
                    <p>
                      {Math.floor(currentWeatherData[0].value?.windSpeed)}km/hr
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardLayout>
          <SevenDayForecast dailyForecast={dailyForecast} />
        </div>
        <div style={{width:"100%"}}>
          <div className="flex justify-between" style={{ marginTop: "24px" }}>
            <HourlyForecast hourlyData={hourlyForecastData} />
          </div>
        </div>
      </div>
    </>
  );
}
