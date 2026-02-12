"use client";

import React, { useState } from "react";

const FAQS = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Default FAQ data for backward compatibility
  const defaultFaqData = [
    {
      question: "What documents are required to apply for studying abroad?",
      answer:
        "You'll Need Academic Transcripts, English Proficiency Test Scores, A Valid Passport, A Statement Of Purpose, And Reference Letters. Requirements Vary By University And Country.",
    },
    {
      question: "How can I apply for a scholarship?",
      answer:
        "You can apply for scholarships through university portals, government programs, or private organizations. Our counselors will guide you through the application process and help identify the best scholarship opportunities for your profile.",
    },
    {
      question: "Do I need IELTS or PTE for admission?",
      answer:
        "Most universities require English proficiency tests like IELTS or PTE. However, some universities offer waivers based on your previous education medium or alternative tests. We can help you determine the specific requirements for your chosen institutions.",
    },
    {
      question: "Can I work while studying abroad?",
      answer:
        "Yes, most countries allow international students to work part-time during their studies. Work hours and regulations vary by country. For example, students in the UK can work up to 20 hours per week during term time and full-time during holidays.",
    },
  ];

  const faqs = faqData || defaultFaqData;

  return (
    <div className="faq-section-component">
      <div className="faq-container-component">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="faq-question">{faq.question}</h3>
              <button
                className={`faq-toggle-btn ${
                  activeIndex === index ? "active" : ""
                }`}
                aria-label="Toggle FAQ"
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`faq-answer ${
                activeIndex === index ? "expanded" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQS;
