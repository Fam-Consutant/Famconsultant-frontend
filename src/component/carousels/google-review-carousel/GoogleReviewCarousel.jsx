"use client";

import React from "react";
import dynamic from "next/dynamic";

const GoogleReviewCarouselComponent = () => {
  return (
    <div className="carusol-container">
      {/* Trustindex Widget */}
      <div className="trustindex-container">
        <div
          src="https://cdn.trustindex.io/loader.js?32ac4c36114b994800866f90efb"
        ></div>
      </div>
    </div>
  );
};

// Wrap in dynamic to prevent hydration issues with third-party widgets
const GoogleReviewCarousel = dynamic(() => Promise.resolve(GoogleReviewCarouselComponent), {
  ssr: false,
});

export default GoogleReviewCarousel;
