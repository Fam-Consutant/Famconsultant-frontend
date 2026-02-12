"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function FlagsLottieClient() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/animations/flags.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div style={{ width: 400, height: 400 }}>
      {animationData ? (
        <Lottie animationData={animationData} loop autoplay />
      ) : (
        <div>Loading animation...</div>
      )}
    </div>
  );
}
