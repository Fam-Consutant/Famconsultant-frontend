"use client";
import React from "react";
import PageTitle from "@/component/page-title/PageTitle";
import Image from "next/image";
import { IMAGES, ICONS } from "@/assets/images";
import IconBoxCard from "@/component/cards/Icon-Box-card/IconBoxCard";
import CounterBox from "@/component/counters/home-counters/CounterBox";
import GoogleReviewCarousel from "@/component/carousels/google-review-carousel/GoogleReviewCarousel";
import { useRouter } from "next/navigation";

import ApplyNow from "@/component/sections/ApplyNow";
import CallToAction from "@/component/sections/CallToAction";

const page = () => {
  const router = useRouter();
  return (
    <div className="services-page-container animate-on-load">
      <div className="page-main-layout animate-on-scroll">
        <PageTitle
          pageName={"About Us"}
          backgroundImage={"about-page-header.png"}
        />
        {/* Why Choose ielts/PTE */}
        <div className="why-chose-pte animate-on-scroll">
          <div className="why-chose-pte-wrapper">
            <h2>Why Students Trust us...</h2>
            <p>
              Thousands of students choose us for transparent guidance, proven
              results, and trusted partnerships with top universities worldwide.
            </p>
          </div>
          <div className="trust-cards-container">
            <IconBoxCard
              icon={ICONS.scholarship}
              title="Scholarship Guidance"
              content="Get expert help finding and applying for top global scholarships."
              isBtn={true}
            />

            <IconBoxCard
              icon={ICONS.expert}
              title="Expert Counselors"
              content="Certified experts guiding students to the best-fit courses abroad."
              isBtn={true}
            />

            <IconBoxCard
              icon={ICONS.transform}
              title="Transparent Service"
              content="Honest advice, no hidden fees, only genuine opportunities and results."
              isBtn={true}
            />

            <IconBoxCard
              icon={ICONS.fast}
              title="Fast Process"
              content="Get expert help finding and applying for top global scholarships."
              isBtn={true}
            />
          </div>
        </div>
        {/* Success Section*/}
        <div className="success-section animate-on-scroll">
          <div className="success-content">
            <h3>
              A Legacy of Success, Transforming Student Dreams Into Global
              Opportunities
            </h3>
            <p>
              With over a decade of excellence, we’ve guided thousands toward
              top universities, scholarships, and successful study abroad
              journeys worldwide.
            </p>
            <div className="hero-left-button-section">
              <button
                className="btn btn-primary"
                onClick={() => router.push("/apply-now")}
              >
                Apply Now{" "}
              </button>
              <button
                className=" btn btn-outline"
                onClick={() => router.push("/scholarship/all")}
              >
                Find The Scholarship
              </button>
            </div>
          </div>
          <div className="grid success-counters">
            <CounterBox target={100} suffix="+" label="Students Assisted" />
            <CounterBox target={8} suffix="+" label="Countries Covered" />
            <CounterBox target={50} suffix="+" label="Partner Universities" />
            <CounterBox target={95} suffix="%" label="Visa Success Rate" />
          </div>
        </div>
      </div>
      {/* About Content Section */}
      <div className="about-content-section animate-on-scroll">
        <p>
          <span>
            We are a dedicated study-abroad consultancy committed to guiding
            students toward global education opportunities. With expert
            counselors, transparent processes, and personalized support,{" "}
          </span>
          we help students secure admissions, visas, scholarships, and smooth
          transitions to top international universities.
        </p>
      </div>

      {/* Our Mission */}
      <div className="page-main-layout">
        <div className="our-mission-container animate-on-scroll">
          <div className="service-content-container animate-on-scroll">
            <div className="service-images-container">
              <Image
                src={IMAGES.our_mission}
                width={320}
                height={320}
                alt="Visa Assistant"
                className="services-container-image"
              />
            </div>
            <div className="service-detail-container">
              <div className="mission-subheading">
                <span>Future Focused</span>
              </div>
              <h4>Our Mission</h4>
              <p>
                To become the most trusted global education partner by
                delivering excellence, transparency, and life-changing
                opportunities for every student.
              </p>
            </div>
          </div>
          <div className="service-content-container reverse-mobile animate-on-scroll">
            <div className="service-detail-container">
              <div className="mission-subheading">
                <span>Guiding Purpose</span>
              </div>
              <h4>Our Mission</h4>
              <p>
                To empower students with honest guidance, reliable support, and
                personalized solutions that help them achieve their academic
                goals across the world.
              </p>
            </div>
            <div className="service-images-container">
              <Image
                src={IMAGES.mission}
                width={320}
                height={320}
                alt="Visa Assistant"
                className="services-container-image"
              />
            </div>
          </div>
        </div>
        {/*Google Reviews*/}
        <div className="google-reviews-section animate-on-scroll">
          <h2>
            Hear From Our <span>Successful Students</span>
          </h2>
          <p>
            Real stories, real success — discover how our expert guidance and
            scholarship support helped students achieve their global education
            dreams.
          </p>
          <GoogleReviewCarousel background="#F7F7F7" />
        </div>
        {/* Apply Now FOrm Section*/}
        <div className="apply-now-section animate-on-scroll">
          <ApplyNow page="about" />
        </div>

        <div className="home-cta animate-on-scroll">
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default page;
