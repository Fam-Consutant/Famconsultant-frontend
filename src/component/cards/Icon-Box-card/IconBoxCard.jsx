"use client";
import React from "react";
import Image from "next/image";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const IconBoxCard = ({
  icon,
  title = "title",
  content = "content",
  onClick,
  isBtn = false,
}) => {
  return (
    <div className="trust-card">
      <div className="icon-box">
        <Image
          src={icon}
          width={40}
          height={40}
          alt={`${title} icon`}
          className="trust-icon"
        />
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
      {isBtn && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Learn more about ${title}`}
        >
          <HiMiniArrowLongRight size={40}  className="trust-icon-button"  />
        </button>
      )}
    </div>
  );
};

export default IconBoxCard;
