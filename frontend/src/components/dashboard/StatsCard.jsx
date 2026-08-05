import React from "react";
import "../../styles/cards.css";

const StatsCard = ({
  title,
  value,
  icon,
  color,
  bgColor
}) => {
  return (
    <div
      className="stats-card"
      style={{
        background: bgColor
      }}
    >
      <div
        className="stats-icon"
        style={{
          color: color
        }}
      >
        {icon}
      </div>

      <div className="stats-info">
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;