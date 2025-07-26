import React from 'react'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function UserScore({ value }) {
  const score = value
  const getColor = () => {
    if (value < 50) return "#e74c3c";
    if (value < 75) return "#f1c40f";
    return "#2ecc71";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: 80,
          height: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-1%",
            left: "-2%",
            width: "105%",
            height: "105%",
            borderRadius: "50%",
            backgroundColor: "#081C22", 
          }}
        />

        <CircularProgressbarWithChildren
          value={value}
          styles={buildStyles({
            pathColor: getColor(),
            trailColor: "transparent",  
            strokeLinecap: "round",
            pathTransitionDuration: 0.5,
          })}
        >
          <div
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              position: "relative",
              zIndex: 2,
            }}
          >
            {value}%
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div
        style={{
          color: "white",
          fontWeight: "bold",
          lineHeight: "1.2",
          fontSize: "16px",
        }}
      >
        Average<br />score
      </div>
    </div>
  );
};
