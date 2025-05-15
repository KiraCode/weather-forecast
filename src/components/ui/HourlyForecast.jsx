import React, { useState } from "react";

import LeftNav from "../../assets/images/left-nav.svg";
import RightNav from "../../assets/images/right-nav.svg";
import LeftNavGray from "../../assets/images/left-nav-gray.svg";
import RighttNavGray from "../../assets/images/right-nav-gray.svg";
import HourComp from "./HourComp";

export default function HourlyForecast({ hourlyData }) {
  const [disableLeftNavigation, setDisableLeftNavigation] = useState(true);
  const [disableRightNavigation, setDisableRightNavigation] = useState(false);
  const scrollRight = () => {
    if (disableRightNavigation) {
      return;
    }
    const scrollVariable = document.querySelector(
      ".hourly-forecast-card-layout"
    );
    setDisableLeftNavigation(false);
    scrollVariable.scrollBy({ left: 720, behavior: "smooth" });
    if (
      Math.floor(scrollVariable.scrollLeft) + scrollVariable.clientWidth + 1 >=
      scrollVariable.scrollWidth
    ) {
      setDisableRightNavigation(true);
    }
  };
  const scrollLeft = () => {
    if (disableLeftNavigation) {
      return;
    }
    const scrollVariable = document.querySelector(
      ".hourly-forecast-card-layout"
    );
    setDisableRightNavigation(false);
    scrollVariable.scrollBy({ left: -720, behavior: "smooth" });
    if (scrollVariable.scrollLeft === 0) {
      setDisableLeftNavigation(true);
    }
  };
  return (
    <div className="hourly-forecast-container">
      <div className="hourly-title-container">
        <p className="forecast-title">Hourly Weather</p>
        <div className="hourly-navigation-arrow">
          <img
            src={disableLeftNavigation ? LeftNavGray : LeftNav}
            onClick={scrollLeft}
            id="right-nav-btn"
          />
          <img
            src={disableRightNavigation ? RighttNavGray : RightNav}
            id="right-nav-btn"
            onClick={scrollRight}
          />
        </div>
      </div>
      <div className="p-0 hourly-forecast-card-layout card-container" style={{}}>
        <div className="hourly-card-main-div">
          {hourlyData.map((elem, elemIndex) => {
            return (
              <HourComp
                key={elemIndex}
                currentTime={elem.isClosestTime}
                data={elem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
