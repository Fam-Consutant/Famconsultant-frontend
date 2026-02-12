"use client";

import React, { use, useRef, useState, useEffect } from "react";
import PageTitle from "@/component/page-title/PageTitle";
import TilePuzzle from "@/component/puzzle/tile-puzzle/TilePuzzle";
import Image from "next/image";
import { IMAGES, ICONS } from "../../../assets/images.js";
import ApplyNow from "@/component/sections/ApplyNow.jsx";
import CallToAction from "@/component/sections/CallToAction.jsx";
import ScholarshipCard from "@/component/cards/scholarship-card/ScholarshipCard.jsx";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { resolveImageUrl } from "@/lib/resolveImageUrl";

const DestinationPage = ({ params }) => {
  const { country } = use(params);
  const descriptionRef = useRef(null);
  const instituteRef = useRef(null);
  const whyStudyRef = useRef(null);
  const applyRef = useRef(null);
  const scholarshipsRef = useRef(null);
  const [activeTab, setActiveTab] = useState("study");
  const router = useRouter();

  // Fetch destinations from API
  const { data: destinationsResponse, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => apiClient.get("/api/studies/destinations"),
  });

  // Find matching destination by country name (case-insensitive)
  const destination = destinationsResponse?.data?.find(
    (dest) =>
      dest.name.toLowerCase() === decodeURIComponent(country).toLowerCase()
  );

  // Fallback to first destination if no match (for testing)
  const currentDestination = destination || destinationsResponse?.data?.[0];
  const destinationId = currentDestination?.id;

  // Update document title dynamically
  useEffect(() => {
    if (currentDestination?.name) {
      document.title = `${currentDestination.name} - Destination | Fam Consultancy`;
    }
  }, [currentDestination?.name]);

  // Fetch gateways with universities for this destination
  const { data: gatewaysResponse, isLoading: gatewaysLoading } = useQuery({
    queryKey: ["gateways", destinationId],
    queryFn: () =>
      apiClient.get(
        `/api/studies/destinations/${destinationId}/gateways/universities`
      ),
    enabled: !!destinationId,
  });

  const gateways = gatewaysResponse?.data?.gateways || [];

  // Fetch scholarships for this destination
  const { data: scholarshipsResponse, isLoading: scholarshipsLoading } =
    useQuery({
      queryKey: ["scholarships", destinationId],
      queryFn: () =>
        apiClient.get(
          `/api/studies/scholarships?destinationId=${destinationId}`
        ),
      enabled: !!destinationId,
    });

  const scholarships = scholarshipsResponse?.data || [];

  // Resolve image URLs
  const headerImage = currentDestination?.headerImageUrl
    ? resolveImageUrl(currentDestination.headerImageUrl)
    : "/images/page-title-background/destination-page-header.png";

  const puzzleImage = currentDestination?.puzzleImageUrl
    ? resolveImageUrl(currentDestination.puzzleImageUrl)
    : "/images/page-title-background/destination-page-header.png";

  const description =
    currentDestination?.description || "Loading destination information...";
  const displayCountry =
    currentDestination?.name || decodeURIComponent(country);

  const handleScroll = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="destination-container animate-on-load">
        <PageTitle
          pageName={`Study in ${displayCountry}`}
          backgroundImage={headerImage}
        />

        {/* Tab buttons */}
        <div className="tab-button-section animate-on-scroll sticky-tabs">
          <button
            className={`tab-button ${
              activeTab === "study" ? "tab-button-active" : ""
            }`}
            onClick={() => {
              setActiveTab("study");
              handleScroll(descriptionRef);
            }}
          >
            Study In {country.charAt(0).toUpperCase() + country.slice(1)}
          </button>
          <button
            className={`tab-button ${
              activeTab === "universities" ? "tab-button-active" : ""
            }`}
            onClick={() => {
              setActiveTab("universities");
              handleScroll(instituteRef);
            }}
          >
            Universities
          </button>
          <button
            className={`tab-button ${
              activeTab === "why-study" ? "tab-button-active" : ""
            }`}
            onClick={() => {
              setActiveTab("why-study");
              handleScroll(whyStudyRef);
            }}
          >
            Why study in {country.charAt(0).toUpperCase() + country.slice(1)}
          </button>
          <button
            className={`tab-button ${
              activeTab === "steps-to-apply" ? "tab-button-active" : ""
            }`}
            onClick={() => {
              setActiveTab("steps-to-apply");
              handleScroll(applyRef);
            }}
          >
            Steps to apply
          </button>
          <button
            className={`tab-button ${
              activeTab === "scholarships" ? "tab-button-active" : ""
            }`}
            onClick={() => {
              setActiveTab("scholarships");
              handleScroll(scholarshipsRef);
            }}
          >
            Scholarships
          </button>
        </div>

        {/* Description Section */}
        <div
          className="description-section animate-on-scroll"
          ref={descriptionRef}
        >
          <div className="description-content">
            <h2 className="description-heading">Study in {displayCountry}</h2>
            <p className="description-paragraph">
              {isLoading ? "Loading destination information..." : description}
            </p>
          </div>
          <div className="description-puzzle">
            <TilePuzzle imageUrl={puzzleImage} />
          </div>
        </div>

        {/* Gateway Sections - Dynamic */}
        <div ref={instituteRef}>
          {gatewaysLoading && (
            <div className="institute-section animate-on-scroll">
              <h2>Loading Universities...</h2>
            </div>
          )}
          {!gatewaysLoading && gateways && gateways.length > 0 && (
            <>
              {gateways.map((gateway, gatewayIndex) => {
                const universitiesWithImages =
                  gateway.universities?.filter((uni) => uni.imageUrl) || [];

                return (
                  <div
                    key={gateway.id}
                    className={
                      gatewayIndex === 0
                        ? "institute-section "
                        : "apply-board-section"
                    }
                  >
                    <h2>{gateway.name}</h2>

                    <div className="institute-list">
                      {universitiesWithImages.map((university) => (
                        <div className="institute-card" key={university.id}>
                          <div className="institute-card-inner">
                            <div className="institute-card-face institute-card-front">
                              <Image
                                src={resolveImageUrl(university.imageUrl)}
                                width={200}
                                height={100}
                                alt={university.name}
                                className="institute-image"
                              />
                            </div>
                            <div className="institute-card-face institute-card-back">
                              <div className="institute-button-section">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => router.push("/apply-now")}
                                >
                                  Apply Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Why Study Section */}

        <div className="why-study-section animate-on-scroll" ref={whyStudyRef}>
          <h3>
            Why Study in the{" "}
            {country.charAt(0).toUpperCase() + country.slice(1)} from Pakistan?
          </h3>
          <p>
            A {country.charAt(0).toUpperCase() + country.slice(1)} degree offers
            more than an academic qualification it opens doors to career growth,
            real-world exposure, and international recognition. Whether you aim
            for undergraduate or postgraduate studies, the 
            {country.charAt(0).toUpperCase() + country.slice(1)} education
            system is designed to nurture creativity, independent thinking, and
            innovation.
          </p>

          <div className="why-study-container">
            <div className="why-content-card">
              <div className="why-icon-section">
                <Image
                  src={ICONS.rank}
                  width={30}
                  height={30}
                  alt="Rank Icon"
                  className="rank-icon"
                />
              </div>
              <div className="why-content-section">
                <h4>Globally Ranked Universities</h4>
                <p>
                  When you study in{" "}
                  {country.charAt(0).toUpperCase() + country.slice(1)} from
                  Pakistan, you get access to over 111 ranked universities
                </p>
              </div>
            </div>
            <div className="why-content-card">
              <div className="why-icon-section">
                <Image
                  src={ICONS.learning}
                  width={30}
                  height={30}
                  alt="Rank Icon"
                  className="learning-icon"
                />
              </div>
              <div className="why-content-section">
                <h4>Practical and Independent Learning</h4>
                <p>
                  Unlike traditional lecture-based systems, 
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                  universities focus on project-based, practical learning.
                </p>
              </div>
            </div>
            <div className="why-content-card">
              <div className="why-icon-section">
                <Image
                  src={ICONS.quality}
                  width={30}
                  height={30}
                  alt="Rank Icon"
                  className="quality-icon"
                />
              </div>
              <div className="why-content-section">
                <h4>Exceptional Education Quality</h4>
                <p>
                  Regulated bodies such as OFS and QAA ensure that every
                  institute in the{" "}
                  {country.charAt(0).toUpperCase() + country.slice(1)} maintains
                  the highest academic standards
                </p>
              </div>
            </div>
            <div className="why-content-card">
              <div className="why-icon-section">
                <Image
                  src={ICONS.culture}
                  width={30}
                  height={30}
                  alt="Rank Icon"
                  className="culture-icon"
                />
              </div>
              <div className="why-content-section">
                <h4>Cultural Diversity and Global Exposure</h4>
                <p>
                  The {country.charAt(0).toUpperCase() + country.slice(1)} is
                  home to diverse communities, making it a perfect destination
                  for international students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply to Study*/}

        <div className="apply-study-section animate-on-scroll" ref={applyRef}>
          <h2>
            How to Apply to Study in{" "}
            {country.charAt(0).toUpperCase() + country.slice(1)} from Pakistan
          </h2>
          <p>
            Nearly all {country.charAt(0).toUpperCase() + country.slice(1)}{" "}
            universities have authorized representatives in Pakistan, and Fam
            Consultant is proud to be one of them. We provide expert guidance
            and personalized support to students at every stage of the{" "}
            {country.charAt(0).toUpperCase() + country.slice(1)} admission and
            visa process — from selecting the right university and course to
            securing a successful student visa outcome.
          </p>
          <div className="apply-study-container">
            <div className="steps-wrapper">
              {/* Step 1 */}
              <div className="step-item">
                <div className="step-number completed">
                  <span className="checkmark">
                    <Image
                      src={ICONS.tick}
                      width={24}
                      height={24}
                      alt="Check Icon"
                    />
                  </span>
                </div>
                <div className="step-content">
                  <h3>Visit Fam Consultant</h3>
                  <p>Bring academic and financial documents.</p>
                </div>
              </div>

              {/* Connector Line 1 */}
              <div className="step-connector"></div>

              {/* Step 2 */}
              <div className="step-item">
                <div className="step-number completed">
                  <span className="checkmark">
                    <Image
                      src={ICONS.tick}
                      width={24}
                      height={24}
                      alt="Check Icon"
                    />
                  </span>
                </div>
                <div className="step-content">
                  <h3>Get Expert Counselling</h3>
                  <p>Personalized course and university guidance.</p>
                </div>
              </div>

              {/* Connector Line 2 */}
              <div className="step-connector"></div>

              {/* Step 3 */}
              <div className="step-item">
                <div className="step-number">
                  <span className="step-text">
                    <Image
                      src={ICONS.three}
                      width={24}
                      height={24}
                      alt="Check Icon"
                    />
                  </span>
                </div>
                <div className="step-content">
                  <h3>Register & Apply</h3>
                  <p>Submit documents and start application.</p>
                </div>
              </div>

              {/* Connector Line 3 */}
              <div className="step-connector"></div>

              {/* Step 4 */}
              <div className="step-item">
                <div className="step-number">
                  <span className="step-text">
                    <Image
                      src={ICONS.four}
                      width={24}
                      height={24}
                      alt="Check Icon"
                    />
                  </span>
                </div>
                <div className="step-content">
                  <h3>Receive Offer Letters</h3>
                  <p>Get offers within few days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships Section */}
        <div
          className="scholarships-section animate-on-scroll"
          ref={scholarshipsRef}
        >
          <h2>Scholarships</h2>
          {scholarshipsLoading && <p>Loading scholarships...</p>}
          {!scholarshipsLoading && scholarships.length === 0 && (
            <p>No scholarships available for this destination yet.</p>
          )}
          {!scholarshipsLoading && scholarships.length > 0 && (
            <div>
              <div className="scholarships-container">
                {scholarships.slice(0, 3).map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="scholarships-footer">
            <button
              onClick={() => router.push(`/scholarship/${country}`)}
              className=" btn load-more-link"
            >
              See more <span>›</span>
            </button>
          </div>
        </div>

        {/* Apply Now Section */}
        <div className="animate-on-scroll">
          <div>
            <ApplyNow page={`${country} destination`} />
          </div>
          <div></div>
        </div>

        {/* CTA Section*/}
        <div className="cta-section-container animate-on-scroll">
          <CallToAction />
        </div>
      </div>
    </>
  );
};

export default DestinationPage;
