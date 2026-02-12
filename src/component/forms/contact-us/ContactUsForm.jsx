"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const ContactUsForm = ({ page, shadow = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  // API mutation for form submission
  const { mutate: submitContact, isPending: isSubmitting } = useMutation({
    mutationKey: ["contact-requests"],
    mutationFn: (payload) =>
      apiClient.post("/api/others/contact-requests", payload),
    onSuccess: (response) => {
      console.log("Contact request submitted successfully:", response);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
      // Show success popup
      setShowPopup(true);
    },
    onError: (error) => {
      console.error("Contact request submission failed:", error);
      alert("Failed to submit your request. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Submitted from page:", page);

    // Submit to API
    submitContact(formData);
  };

  return (
    <>
      <div className="apply-form-container">
        <div
          className="apply-form-card"
          style={{
            boxShadow: shadow ? "8px 10px 14px rgba(0, 0, 0, 0.1)" : "none",
          }}
        >
          <form onSubmit={handleSubmit} className="apply-form">
            <div className="contact-form-row-full">
              <div className="apply-form-group">
                <label className="apply-form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="apply-form-input"
                  required
                />
              </div>
            </div>

            <div className="contact-form-row-full">
              <div className="apply-form-group">
                <label className="apply-form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="apply-form-input"
                  required
                />
              </div>
            </div>
            <div className="contact-form-row-full">
              <div className="apply-form-group">
                <label className="apply-form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="apply-form-input"
                  required
                />
              </div>
            </div>
            <div className="contact-form-row-full">
              <div className="apply-form-group">
                <label className="apply-form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="apply-form-input"
                  required
                />
              </div>
            </div>
            <div className="contact-form-row-full">
              <div className="apply-form-group">
                <label className="apply-form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="apply-form-input"
                  rows="5"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="popup-content"
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1B4965 0%, #5FA8D3 100%)",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1B4965",
                marginBottom: "12px",
              }}
            >
              Thank You!
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#666",
                marginBottom: "30px",
                lineHeight: "1.6",
              }}
            >
              Thank you for your message, our team will contact you soon
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="btn btn-primary"
              style={{
                padding: "12px 30px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUsForm;
