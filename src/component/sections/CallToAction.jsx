"use client";
import React from "react";


import Image from "next/image";
import { IMAGES } from "../../assets/images";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();
  return (
    <div className="cta-section">
      <div className="cta-section-wrapper">
        <div className="cta-section-content">
          <h3>Start Your Study Abroad Journey With Us Today</h3>
          <p>
            Take the first step toward your dream university. Apply now for
            expert guidance, scholarship support, and personalized counseling
            from our certified education consultants.
          </p>
          <div className="hero-left-button-section">
            <button
              className="btn btn-secondary"
              style={{color: "#ffffff"}}
              onClick={() => router.push("/apply-now")}
            >
              Free Consultation{" "}
            </button>
            <button
              className=" btn btn-outline-white"
              onClick={() => router.push("/scholarship/all")}
            >
              Find The Scholarship
            </button>
          </div>
        </div>
        <div className="cta-section-image">
          <Image
            src={IMAGES.ctaImage}
            alt="ctaImage"
            width={300}
            height={300}
            className="cta-image"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
