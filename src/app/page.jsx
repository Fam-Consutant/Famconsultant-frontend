"use client";

import { useEffect } from "react";
import { IMAGES, ICONS } from "@/assets/images";
import Image from "next/image";
import { IoSchoolSharp } from "react-icons/io5";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import CounterBox from "@/component/counters/home-counters/CounterBox";
import DestinationCarousel from "@/component/carousels/destination-carousel/DestinationCarousel";
import UniversitiesLogoCarousel from "@/component/carousels/universities-carousel/UniversitiesLogoCarousel";
import VideoTestimonialCarousel from "@/component/carousels/video-testimonials-carousel/VideoTestimonialCarousel";
import GoogleReviewCarousel from "@/component/carousels/google-review-carousel/GoogleReviewCarousel";
import ApplyNow from "@/component/forms/apply-now/ApplyNow";
import FAQS from "@/component/faqs/home/FAQS";
import Header from "@/component/header/Header";
import Footer from "@/component/footer/Footer";
import CallToAction from "@/component/sections/CallToAction";
import IconBoxCard from "@/component/cards/Icon-Box-card/IconBoxCard";
import TestSection from "@/component/sections/TestSection";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

import AnimationFlags from "@/component/animations/heroAnimation/HeroFlagsAnimation";

// Home Page FAQ Data
const homeFaqData = [
  {
    question: "What documents are required to apply for studying abroad?",
    answer:
      "You typically need a passport, academic documents, English test results, SOP, and proof of funds.",
  },
  {
    question: "How can I apply for a scholarship?",
    answer:
      "You can apply through universities, governments, or private bodies after submitting your admission application.",
  },
  {
    question: "Do I need IELTS or PTE for admission?",
    answer:
      "Most universities require IELTS or PTE, but some offer alternatives or exemptions.",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "Yes, international students can usually work part-time during studies and full-time during breaks.",
  },
];

export default function Home() {
  const router = useRouter();
  const {
    mutate: fetchCta,
    data: ctaResponse,
    isPending: isCtaLoading,
  } = useMutation({
    mutationKey: ["buttons", 1],
    mutationFn: () =>
      apiClient.get("/api/buttons", { params: { displayOrder: 1 } }),
  });

  useEffect(() => {
    fetchCta();
  }, [fetchCta]);

  const activeCta = ctaResponse?.data?.find((item) => item?.isActive);
  const ctaLabel = activeCta?.title || "Find The Scholarship";
  const ctaHref = activeCta?.url || "/scholarship/all";

  const handleCtaClick = () => {
    if (!ctaHref) return;
    router.push(ctaHref);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const targets = document.querySelectorAll(".animate-on-scroll");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleTestButton = () => {
    router.push("/ielts-pte");
  };

  return (
    <>
      <Header />
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section animate-on-load">
          <div className="hero-section-wrapper">
            <div className="hero-overlay">
              <div className="hero-left animate-slide-left">
                <h2 className="hero-left-heading">
                  Find Global{" "}
                  <span className="secondary-text">Scholarships</span> and Study
                  Opportunities for Your Future
                </h2>
                <p>
                  Discover top international scholarships across the UK, USA,
                  Canada, and Australia. Start your academic journey today with
                  FAM Consultant’s expert guidance and trusted application
                  support.
                </p>
                <div className="hero-left-button-section">
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push("/apply-now")}
                  >
                    Free Consultation{" "}
                  </button>
                  <button
                    className=" btn btn-outline"
                    onClick={handleCtaClick}
                    disabled={isCtaLoading}
                  >
                    {ctaLabel}
                  </button>
                </div>
              </div>
              <div className="hero-right animate-fade-in">
                {/* <Image
                  src={IMAGES.heroImage}
                  width={420}
                  height={420}
                  alt="hero-image"
                  className="hero-righ-image"
                /> */}
                <AnimationFlags />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section*/}
        <div className="trust-section animate-on-scroll">
          <div className="trust-section-wrapper">
            <h2>
              Why Student <span>Trust Us</span>...
            </h2>
            <p>
              Thousands of students choose us for transparent guidance, proven
              results, and trusted partnerships with top universities worldwide.
            </p>
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
        </div>
        <div className="home-main-layout">
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
                  Free Consultation{" "}
                </button>
                <button
                  className=" btn btn-outline"
                  onClick={handleCtaClick}
                  disabled={isCtaLoading}
                >
                  {ctaLabel}
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
          {/* Destination Section*/}
        </div>
        <div className="destination-section-wrapper">
          <div className="destination-section animate-on-scroll">
            <h2>
              Explore Our Top <span>Study Destinations</span>
            </h2>
            <p>
              Choose from the world’s leading education hubs offering
              scholarships, career pathways, and vibrant experiences for
              international students.
            </p>
            <DestinationCarousel />
          </div>
        </div>
        {/* Univercities Logo Section*/}
        <div className="universities-logo-section animate-on-scroll">
          <UniversitiesLogoCarousel />
        </div>
        {/* Find Perfect Section*/}
        <div className="home-main-layout">
          <div className="find-section animate-on-scroll">
            <div className="find-section-wrapper">
              <div className="find-section-image">
                <Image
                  src={IMAGES.findImage}
                  alt="findImage"
                  width={220}
                  height={220}
                  className="find-image"
                />
              </div>
              <div className="find-section-content">
                <h3>Find The Perfect Scholarship For Your Future</h3>
                <p>
                  Search scholarships tailored to your goals, destination, and
                  field of study — discover funding opportunities that make
                  studying abroad affordable.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/scholarship/all")}
                >
                  Find the Scholarship
                </button>
              </div>
            </div>
          </div>
          {/* Student Services*/}

          <div className="student-services-section animate-on-scroll">
            <h2>
              Our Comprehensive <span>Student Services</span>
            </h2>
            <p>
              From application to arrival, we offer complete support for your
              study abroad journey — ensuring guidance, clarity, and success at
              every step.
            </p>

            <div className="student-card-container">
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.scholarship}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Admission Guidance</h3>
                <p>
                  Get personalized assistance in selecting the right university,
                  program, and country that best aligns with your academic goals
                  and budget.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.expert}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Visa Assistance</h3>
                <p>
                  COur experienced counselors help you prepare strong visa
                  files, ensuring accuracy, timely submissions, and a higher
                  chance of approval.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.transform}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Scholarship Support</h3>
                <p>
                  We identify and assist with exclusive global scholarships to
                  make studying abroad affordable for deserving students.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
            </div>

            <div className="student-card-container">
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.scholarship}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Accommodation Help</h3>
                <p>
                  Find safe, comfortable housing options near your campus — with
                  guidance on hostels, rentals, and verified student housing
                  providers.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.expert}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Pre-Departure Briefing</h3>
                <p>
                  Prepare confidently with our detailed sessions covering travel
                  tips, packing guides, insurance, and adapting to your new
                  country’s culture.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
              <div className="student-card">
                <div className="icon-box">
                  <Image
                    src={ICONS.transform}
                    width={40}
                    height={40}
                    alt="scholarship icon"
                    className="trust-icon"
                  />
                </div>
                <h3>Career Counselling</h3>
                <p>
                  Receive expert advice on course selection, job prospects, and
                  long-term career goals to make your international education
                  truly rewarding.
                </p>
                <button>
                  <HiMiniArrowLongRight size={40} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Student Success Section*/}
        <div className="student-success-section-wrapper">
          <div className="student-success-section animate-on-scroll">
            <h2>
              Hear From Our <span>Successful Students</span>
            </h2>
            <p>
              Real stories, real success — discover how our expert guidance and
              scholarship support helped students achieve their global education
              dreams.
            </p>
            <VideoTestimonialCarousel />
          </div>
        </div>
        {/*Google Reviews*/}
        <div className="home-main-layout">
          <div className="google-reviews-section animate-on-scroll">
            <h2>
              Hear From Our <span>Successful Students</span>
            </h2>
            <p>
              Real stories, real success — discover how our expert guidance and
              scholarship support helped students achieve their global education
              dreams.
            </p>
            <GoogleReviewCarousel />
          </div>

          {/* Free PTE Section*/}
          <div className="animate-on-scroll">
            <TestSection onButtonClick={handleTestButton} />
          </div>
        </div>
        {/* Apply Now FOrm Section*/}
        <div className="apply-now-section animate-on-scroll">
          <ApplyNow page="home" shadow={true} />
        </div>

        {/* FAQ Sections*/}
        <div className="faq-section animate-on-scroll">
          <h2 className="hero-left-heading">Frequently Asked Questions</h2>
          <p>
            Find quick answers to common queries about studying abroad, visas,
            scholarships, and our expert consultancy services to guide your
            journey.
          </p>
          <div className="faq-wrapper">
            <FAQS faqData={homeFaqData} />
          </div>
        </div>
        <div className="home-main-layout">
          {/* CTA Section*/}
          <div className="home-cta animate-on-scroll">
            <CallToAction />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
