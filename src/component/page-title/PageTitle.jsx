"use client";

import React from "react";
import { useRouter } from "next/navigation";

const PageTitle = ({
  pageName,
  backgroundImage,
  isDestination = false,
  onBtnClick = () => {},
}) => {
  const router = useRouter();
  
  // Check if backgroundImage is a full URL or relative path
  const bgImageUrl = backgroundImage?.startsWith('http') 
    ? backgroundImage 
    : `/images/page-title-background/${backgroundImage || "destination-page-header.png"}`;
  
  return (
    <div
      className="page-title-section"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className="page-title-overlay">
        <div className="page-title-content">
          <div className="breadcrumb">
            <span>Fam Consultant</span>
            <span className="separator">/</span>
            {isDestination ? (
              <>
                <span>Study Destinations</span>
                <span className="separator">/</span>
                <span className="current">
                  Study in{" "}
                  {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                </span>
              </>
            ) : (
              <>
                <span>{pageName}</span>
              </>
            )}
          </div>
          <h1 className="page-title">
            {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
          </h1>
          <button
            onClick={() => router.push("/apply-now")}
            className="btn btn-primary"
          >
            Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
