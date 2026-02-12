import React from "react";
import { LOGOS } from "../../assets/images";

const sizeMap = {
  sm: 52,
  md: 68,
  lg: 88,
};

const Loader = ({
  size = "md",
  message,
  overlay = false,
  className = "",
  logoSrc,
}) => {
  const dimension = sizeMap[size] || sizeMap.md;
  const thickness = Math.max(4, Math.round(dimension / 12));
  const style = {
    "--loader-size": `${dimension}px`,
    "--loader-thickness": `${thickness}px`,
  };

  return (
    <div
      className={`sleek-loader ${
        overlay ? "sleek-loader-overlay" : ""
      } ${className}`.trim()}
      style={style}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="sleek-spinner">
        <span className="sleek-spinner-track" />
        <span className="sleek-spinner-gradient" />
        <span className="sleek-spinner-dot" />
      </div>
      {message ? <div className="sleek-loader-message">{message}</div> : null}
    </div>
  );
};

export default Loader;
