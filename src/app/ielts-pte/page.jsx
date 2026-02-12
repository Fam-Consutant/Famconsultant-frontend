"use client";
import React, { useState } from "react";

import Image from "next/image";
import PageTitle from "@/component/page-title/PageTitle";
import IconBoxCard from "@/component/cards/Icon-Box-card/IconBoxCard";
import { IMAGES, ICONS } from "@/assets/images";
import TestSection from "@/component/sections/TestSection";
import ApplyNow from "@/component/forms/apply-now/ApplyNow";
import FAQS from "@/component/faqs/home/FAQS";
import CallToAction from "@/component/sections/CallToAction";
import Popup from "@/component/popup/Popup";
import { useRouter } from "next/navigation";
import { mcqApi } from "@/lib/api/mcq";
import { toast } from "react-hot-toast";

// PTE FAQ Data
const pteFaqData = [
  {
    question: "Is PTE easier than IELTS?",
    answer:
      "PTE is often considered easier because it is fully computer-based and AI-scored.",
  },
  {
    question: "How can I check my PTE score online?",
    answer:
      "You can check your PTE score by logging into your Pearson PTE account on the official website.",
  },
  {
    question: "How can I prepare for PTE?",
    answer:
      "You can prepare for PTE by practicing mock tests, improving English skills, and learning exam strategies.",
  },
  {
    question: "Is it difficult to score 79 in PTE?",
    answer:
      "Scoring 79 in PTE is achievable with proper preparation, practice, and exam techniques.",
  },
];

// IELTS FAQ Data
const ieltsFaqData = [
  {
    question: "Is IELTS easier than PTE?",
    answer:
      "IELTS can be more challenging as it is partly paper-based and involves human-scored speaking.",
  },
  {
    question: "How can I check my IELTS score online?",
    answer:
      "You can check your IELTS score by logging into your official IELTS account.",
  },
  {
    question: "How can I prepare for IELTS?",
    answer:
      "Prepare by practicing reading, writing, listening, and speaking tests regularly.",
  },
  {
    question: "Is it difficult to score 7.0 or above in IELTS?",
    answer:
      "Scoring 7.0+ is achievable with consistent practice, preparation, and understanding the test format.",
  },
];

const IeltsPtePage = () => {
  const [activeTab, setActiveTab] = useState("pte");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [regForm, setRegForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    consent: false,
  });
  const [regLoading, setRegLoading] = useState(false);
  const router = useRouter();

  const handleOpenPopup = () => {

    if (activeTab === "pte")
    setIsPopupOpen(true);
  else
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleRegChange = (e) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  const startTestRegistration = async () => {
    if (!regForm.firstName || !regForm.lastName || !regForm.email || !regForm.phoneNumber) {
      toast.error("Please fill all fields.");
      return;
    }
    if (!regForm.consent) {
      toast.error("Please agree to the privacy policy to continue.");
      return;
    }

    setRegLoading(true);
    try {
      const payload = {
        firstName: regForm.firstName,
        lastName: regForm.lastName,
        email: regForm.email,
        phoneNumber: regForm.phoneNumber,
        agreeToTerms: true,
      };
      const res = await mcqApi.register(payload);
      if (res?.success && res?.data?.id) {
        const testSessionId = res.data.id;
        if (typeof window !== "undefined") {
          localStorage.setItem("testSessionId", testSessionId);
        }
        setIsPopupOpen(false);
        router.push("/mcqs-test");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (err) {
      const msg = err?.payload?.message || err?.message || "Registration error";
      toast.error(msg);
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="ielts-page-layout animate-on-load">
      <div className="page-main-layout animate-on-scroll">
        <PageTitle
          pageName={"IELTS/PTE"}
          backgroundImage={"ielts-page-header.png"}
        />

        {/* Tab buttons */}
        <div className="tab-button-section animate-on-scroll">
          <button
            className={`tab-button ${
              activeTab === "pte" ? "tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("pte")}
          >
            Pearson Test of English (PTE)
          </button>
          <button
            className={`tab-button ${
              activeTab === "ielts" ? "tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("ielts")}
          >
            IELTS
          </button>
        </div>

        {/* Ielts/PTE Content */}
        <div className="pte-content animate-on-scroll">
          <h2>What is {activeTab === "pte" ? "PTE" : "IELTS"}</h2>
          {activeTab === "pte" ? (
            <p>
              The Pearson Test of English (PTE) is a fully computer-based
              English proficiency exam designed for students, professionals, and
              immigration applicants who want to study, work, or settle abroad.
              It evaluates your speaking, writing, reading, and listening skills
              using advanced AI scoring, ensuring completely unbiased and fast
              results.
              <br />
              Recognized by thousands of universities and accepted for visa
              applications in major countries like Australia, the UK, Canada,
              New Zealand, and the USA, PTE is one of the most reliable and
              efficient English tests for international opportunities.
            </p>
          ) : (
            <p>
              The International English Language Testing System (IELTS) is a
              globally recognized English proficiency exam designed for
              students, professionals, and immigration applicants who want to
              study, work, or settle abroad. It evaluates your listening,
              reading, writing, and speaking skills to accurately measure your
              English ability for academic or professional purposes. <br />
              IELTS is accepted by thousands of universities, employers, and
              immigration authorities in major countries like Australia, the UK,
              Canada, New Zealand, and the USA, making it one of the most
              trusted English tests worldwide.
            </p>
          )}
        </div>

        {/* Why Choose ielts/PTE */}
        <div className="why-chose-pte animate-on-scroll">
          <div className="why-chose-pte-wrapper">
            <h2>Why Choose {activeTab === "pte" ? "PTE" : "IELTS"}?</h2>
            {activeTab === "pte" ? (
              <p>
                PTE is one of the most preferred English proficiency tests
                because of its speed, fairness, and global acceptance. It offers
                several advantages that make it ideal for students and
                professionals:
              </p>
            ) : (
              <p>
                IELTS is one of the most preferred English tests because of its
                accuracy, reliability, and international recognition. It offers
                several advantages that make it ideal for students and
                professionals:
              </p>
            )}
          </div>
          <div className="trust-cards-container">
            <IconBoxCard
              icon={ICONS.clock}
              title="Fast Results"
              content="Get your official score within 24–48 hours."
            />

            <IconBoxCard
              icon={ICONS.robot}
              title="AI-Based Scoring"
              content="No human bias; fully automated and fair evaluation."
            />

            <IconBoxCard
              icon={ICONS.calender}
              title="Flexible Test Dates"
              content="Multiple test sessions available throughout the month."
            />

            <IconBoxCard
              icon={ICONS.globe}
              title="Widely Accepted"
              content="Trusted by universities, colleges, and immigration bodies worldwide."
            />
          </div>
        </div>

        {/* Ielts/PTE Test Section */}
        <div className="animate-on-scroll">
          <TestSection onButtonClick={handleOpenPopup} activeTab={activeTab} />
        </div>

        {/* PTE Test Format */}

        <div className="test-format-container animate-on-scroll">
          <div className="test-format-container-wrapper">
            <h2>PTE Test Format</h2>
            <p>
              The PTE exam consists of three main sections, completed in aThe
              PTE exam includes three core sections—speaking, writing, reading,
              and listening—all completed in one continuous, computer-based
              testing session. single sitting.
            </p>
          </div>
          <div
            className={`test-format-grid ${
              activeTab === "pte" ? "test-format-grid-pte" : "test-format-grid-ielts"
            }`}
          >
            {activeTab === "pte" ? (
              <>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.speaking}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Speaking & Writing</h4>
                      <p>
                        Duration: <span>54 – 67 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>7 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Read Aloud</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Repeat Sentence</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Describe Image</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Re-tell Lecture</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Answer Short Question</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Summarize Written Text</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Essay Writing</span>
                    </div>
                  </div>
                </div>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.reading}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Reading</h4>
                      <p>
                        Duration: <span> 29 – 30 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>5 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Multiple Choice, Single Answer</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Multiple Choice, Multiple Answer</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Re-order Paragraphs</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Reading Fill in the Blanks</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Reading & Writing Fill in the Blanks</span>
                    </div>
                  </div>
                </div>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.headphones}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Listening</h4>
                      <p>
                        Duration: <span>30 – 43 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>8 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Summarize Spoken Text</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>MCQ (Multiple Answer)</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>MCQ (Single Answer)</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Fill in the Blanks</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Highlight Correct Summary</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Select Missing Word</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Highlight Incorrect Words</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Write from Dictation</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.reading}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Listening</h4>
                      <p>
                        Duration:{" "}
                        <span>30 minutes + 10 minutes transfer time</span>
                      </p>
                      <p>
                        Number of Tasks: <span>4 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Multiple Choice Questions</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Matching</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Map/Diagram Labeling</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Form/Note/Diagram/Table/Summary Completion</span>
                    </div>
                  </div>
                </div>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.headphones}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Reading</h4>
                      <p>
                        Duration: <span> 60 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>5 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Multiple Choice Questions</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>True/False/Not Given</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Matching Headings</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Sentence Completion</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Short Answer Questions</span>
                    </div>
                  </div>
                </div>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.writing}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Writing</h4>
                      <p>
                        Duration: <span>60 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>2 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Describe a graph, chart, table, or process (Academic) / Letter writing (General Training)</span>
                    </div>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Essay writing on a given topic</span>
                    </div>
                  </div>
                </div>
                <div className="test-format-card">
                  <div className="test-format-card-header">
                    <div className="test-format-header-icon">
                      <Image
                        src={ICONS.speaking}
                        width={50}
                        height={50}
                        alt="test format icon"
                      />
                    </div>
                    <div className="test-format-header-content">
                      <h4>Speaking</h4>
                      <p>
                        Duration: <span>11 - 14 minutes</span>
                      </p>
                      <p>
                        Number of Tasks: <span>3 task types</span>
                      </p>
                    </div>
                  </div>
                  <div className="test-format-card-content">
                    <p>Task Included:</p>
                    <div className="task-list">
                      <Image
                        src={ICONS.checkul}
                        width={20}
                        height={20}
                        alt="check icon"
                      />
                      <span>Introduction and Interview</span>
                    </div>
                      <div className="task-list">
                        <Image
                          src={ICONS.checkul}
                          width={20}
                          height={20}
                          alt="check icon"
                        />
                        <span>Individual Long Turn (Speak on a given topic)</span>
                      </div>
                         <div className="task-list">
                        <Image
                          src={ICONS.checkul}
                          width={20}
                          height={20}
                          alt="check icon"
                        />
                        <span>Two-way Discussion on related topics</span>
                      </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Apply Now FOrm Section*/}
        <div className="apply-now-section animate-on-scroll">
          <ApplyNow page="ielts-pte" shadow={true} />
        </div>
      </div>

      {/* FAQ Sections*/}
      <div className="faq-section">
        <h2 className="hero-left-heading">Frequently Asked Questions</h2>
        <p>
          Find quick answers to common queries about studying abroad, visas,
          scholarships, and our expert consultancy services to guide your
          journey.
        </p>
        <div className="faq-wrapper">
          <FAQS faqData={activeTab === "pte" ? pteFaqData : ieltsFaqData} />
        </div>
      </div>
      <div className="page-inner-layout animate-on-scroll">
        {/* CTA Section*/}
        {/* Ielts/PTE Test Section */}
        <div className="animate-on-scroll">
          <TestSection onButtonClick={handleOpenPopup}  />
        </div>
      </div>

      {/* Popup Modal - Only on IELTS/PTE Page */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <div className="popup-image-section">
          <Image
            src={IMAGES.pte_test}
            alt="PTE Test"
            width={360}
            height={520}
            className="test-image"
          />
        </div>
        <div className="popup-content-section">
          <h4>Unlock Your {activeTab === "pte" ? "PTE" : "IELTS"} Prep Discount</h4>
          <p>
            Fill in your details below to start the free mock test and get
            access to our {activeTab === "pte" ? "PTE" : "IELTS"} course Discount.
          </p>
          <h4>How to Redeem:</h4>
          <p>
            After you submit your details, the {activeTab === "pte" ? "PTE" : "IELTS"} mock test launches instantly.
            Complete it at your own pace and explore our services further — it’s
            that simple.
          </p>
          <form className="popup-form">
            <div className="apply-form-row">
              <div className="apply-form-group">
                <label className="popup-form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="popup-form-input"
                  value={regForm.firstName}
                  onChange={handleRegChange}
                />
              </div>

              <div className="apply-form-group">
                <label className="popup-form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="popup-form-input"
                  value={regForm.lastName}
                  onChange={handleRegChange}
                />
              </div>
            </div>
            <div className="apply-form-row">
              <div className="apply-form-group">
                <label className="popup-form-label">Email</label>
                <input type="email" name="email" className="popup-form-input" value={regForm.email} onChange={handleRegChange} />
              </div>
              <div className="apply-form-group">
                <label className="popup-form-label">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="popup-form-input"
                  value={regForm.phoneNumber}
                  onChange={handleRegChange}
                />
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                name="consent"
                className="popup-form-checkbox"
                checked={regForm.consent}
                onChange={handleRegChange}
              />
              <span className="popup-form-checkbox-text">
                {"  "}By submitting, you agree to our privacy policy.
              </span>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={startTestRegistration}
              disabled={regLoading}
            >
              {regLoading ? "Starting..." : "Start The Test"}
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default IeltsPtePage;
