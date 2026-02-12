"use client";
import React, { useEffect } from "react";
import PageTitle from "@/component/page-title/PageTitle";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import ApplyNow from "@/component/sections/ApplyNow";
import CallToAction from "@/component/sections/CallToAction";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  // Update document title
  useEffect(() => {
    document.title = "Services | Fam Consultancy";
  }, []);

  const handleApplyNow = () => {
    router.push("/apply-now");
  };

  return (
    <div className="services-page-container animate-on-load">
      <PageTitle
        pageName={"Services"}
        backgroundImage={"services-page-header.png"}
      />
      <div className="service-main-content animate-on-scroll">
        <h2>How do we help students?</h2>
        <p>
          At Fam Consultant, we provide complete end-to-end guidance — from
          university selection and visa filing to accommodation and career
          planning — ensuring your study abroad journey is smooth, successful,
          and stress-free.
        </p>
      </div>

      <div className="service-content-container animate-on-scroll">
        <div className="service-images-container">
          <Image
            src={IMAGES.visa_assistant}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Visa Assistance</span>
          </div>
          <h4>Expert support for smooth visa approval</h4>
          <p>
            Our dedicated visa experts guide you through every step—from
            documentation to interview preparation—ensuring your visa
            application is accurate, complete, and submitted on time for a
            hassle-free approval process.
          </p>
          <p>
            <span>-</span> Accurate document preparation
          </p>
          <p>
            <span>-</span> Interview readiness coaching
          </p>
          <p>
            <span>-</span> High approval success rate
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
      </div>
      <div className="service-content-container reverse-mobile animate-on-scroll">
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Scholarship Support</span>
          </div>
          <h4>Making global education affordable</h4>
          <p>
            We help students discover and apply for international scholarships
            that match their academic excellence and background, reducing
            financial burden and making studying abroad more accessible and
            achievable.
          </p>
          <p>
            <span>-</span> Identify top scholarships
          </p>
          <p>
            <span>-</span> Application form guidance
          </p>
          <p>
            <span>-</span> Maximize funding chances
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
        <div className="service-images-container">
          <Image
            src={IMAGES.services_scholarship}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
      </div>
      <div className="service-content-container animate-on-scroll">
        <div className="service-images-container">
          <Image
            src={IMAGES.third_image}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Admission Guidance</span>
          </div>
          <h4>Find the right course and university</h4>
          <p>
            Our counselors offer personalized advice to match your academic
            goals and interests with the right universities, programs, and
            countries, simplifying the admission process and ensuring informed
            decisions.
          </p>
          <p>
            <span>-</span> University shortlisting support
          </p>
          <p>
            <span>-</span> Application document review
          </p>
          <p>
            <span>-</span> Personalized admission strategy
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
      </div>
      <div className="service-content-container reverse-mobile animate-on-scroll">
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Accommodation Help</span>
          </div>
          <h4>Safe and verified student housing</h4>
          <p>
            We assist you in finding secure, affordable, and comfortable
            accommodation options near your chosen campus — from hostels to
            rentals — through our trusted and verified student housing network.
          </p>
          <p>
            <span>-</span> Verified housing listings
          </p>
          <p>
            <span>-</span> Campus proximity options
          </p>
          <p>
            <span>-</span> Budget-friendly recommendatios
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
        <div className="service-images-container">
          <Image
            src={IMAGES.accomadations}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
      </div>
      <div className="service-content-container animate-on-scroll">
        <div className="service-images-container">
          <Image
            src={IMAGES.predeparture}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Pre-Departure Briefing</span>
          </div>
          <h4>Get ready for your journey abroad</h4>
          <p>
            Before you fly, we prepare you with essential travel, packing, and
            cultural adjustment tips to ensure you start your new life overseas
            confidently, comfortably, and fully prepared.
          </p>
          <p>
            <span>-</span> Travel & packing checklist
          </p>
          <p>
            <span>-</span> Cultural adjustment tips
          </p>
          <p>
            <span>-</span> Insurance & safety guidance
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
      </div>
      <div className="service-content-container reverse-mobile animate-on-scroll">
        <div className="service-detail-container">
          <div className="service-badge">
            <span>Career Counselling</span>
          </div>
          <h4>Shape your future with expert guidance</h4>
          <p>
            Our career counselors help you align your academic path with future
            goals, exploring career options, job prospects, and global
            opportunities that suit your passion and potential.
          </p>
          <p>
            <span>-</span> Course-to-career mapping
          </p>
          <p>
            <span>-</span> Job market insights
          </p>
          <p>
            <span>-</span>Personalized growth advice
          </p>
          <button className="btn btn-primary" onClick={handleApplyNow}>
            Free Consultation
          </button>
        </div>
        <div className="service-images-container">
          <Image
            src={IMAGES.career_consulting}
            width={320}
            height={320}
            alt="Visa Assistant"
            className="services-container-image"
          />
        </div>
      </div>
      {/* Apply Now FOrm Section*/}
      <div className="apply-now-section animate-on-scroll">
        <ApplyNow page="services" />
      </div>

      <div className="home-cta animate-on-scroll">
        <CallToAction />
      </div>
    </div>
  );
};

export default page;
