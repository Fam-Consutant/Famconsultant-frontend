"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const ApplyNow = ({ page, shadow= false }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    preferredCountry: "",
    fieldOfInterest: "",
    city: "",
    batch: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [destinations, setDestinations] = useState([
    { id: "1", name: "USA" },
    { id: "2", name: "UK" },
    { id: "3", name: "Canada" },
    { id: "4", name: "Australia" },
  ]);
  const router = useRouter();

  // Fetch destinations from API
  const {
    data: destinationsResponse,
    isLoading: isDestinationsLoading,
  } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => apiClient.get("/api/studies/destinations"),
  });

  // Update destinations when API response is available
  useEffect(() => {
    if (destinationsResponse?.data && destinationsResponse.data.length > 0) {
      setDestinations(destinationsResponse.data);
    }
  }, [destinationsResponse]);

  // API mutation for form submission
  const {
    mutate: submitApplication,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["apply-now"],
    mutationFn: (payload) => apiClient.post("/api/others/apply-now", payload),
    onSuccess: (response) => {
      console.log("Application submitted successfully:", response);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        preferredCountry: "",
        fieldOfInterest: "",
        city: "",
        batch: "",
      });
      // Show success popup
      setShowPopup(true);
    },
    onError: (error) => {
      console.error("Application submission failed:", error);
      alert("Failed to submit application. Please try again.");
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
    
    // Handle page prop - could be string or object with page property
    let pageName = "unknown";
    if (typeof page === "string") {
      pageName = page;
    } else if (page && typeof page === "object" && page.page) {
      pageName = page.page;
    }
    
    // Prepare payload with status from page prop
    const payload = {
      ...formData,
      status: pageName,
    };
    
    console.log("Form submitted:", payload);
    console.log("Submitted from page:", pageName);
    
    // Submit to API
    submitApplication(payload);
  };

  return (
    <>
      <div className="apply-form-container" style={{padding: shadow ? "40px 20px 0px 40px":"40px 0px 0px 0px"}}>
        <div
          className="apply-form-card"
          style={{ boxShadow: shadow ? "8px 10px 14px rgba(0, 0, 0, 0.1)" : "none", padding: shadow ? "48px 56px":"48px 48px 48px 0px" }}

        >
          <h2 className="apply-form-heading">
            Apply Now For Your Dream University
          </h2>
          <p className="apply-form-subtitle">
            Submit your application today and let our expert counselors guide you
            through admissions, scholarships, and Visas — turning your study
            abroad dream into reality.
          </p>

          <form onSubmit={handleSubmit} className="apply-form">
          <div className="apply-form-row">
            <div className="apply-form-group">
              <label className="apply-form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="apply-form-input"
              />
            </div>

            <div className="apply-form-group">
              <label className="apply-form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="apply-form-input"
              />
            </div>
          </div>

          <div className="apply-form-row">
            <div className="apply-form-group">
              <label className="apply-form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="apply-form-input"
              />
            </div>

            <div className="apply-form-group">
              <label className="apply-form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="apply-form-input"
              />
            </div>
          </div>

          <div className="apply-form-row">
            <div className="apply-form-group">
              <label className="apply-form-label">Preferred Country</label>
              <select
                name="preferredCountry"
                value={formData.preferredCountry}
                onChange={handleChange}
                className="apply-form-select"
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.name}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="apply-form-group">
              <label className="apply-form-label">Field of Interest</label>
              <select
                name="fieldOfInterest"
                value={formData.fieldOfInterest}
                onChange={handleChange}
                className="apply-form-select"
              >
                <option value=""></option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts">Arts</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="apply-form-row">
            <div className="apply-form-group">
              <label className="apply-form-label" >City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="apply-form-input"
                style={{paddingTop:'15px'}}
              />
            </div>

            <div className="apply-form-group">
              <label className="apply-form-label">Preferred Batch</label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="apply-form-select"
              >
                <option value=""></option>
                <option value="Fall 2025">Fall 2025</option>
                <option value="Spring 2026">Spring 2026</option>
                <option value="Fall 2026">Fall 2026</option>
                <option value="Spring 2027">Spring 2027</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Consultation"}
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
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="popup-content"
            style={{
              background: 'white',
              padding: '40px',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B4965 0%, #5FA8D3 100%)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                fontSize: '24px',
                fontWeight: '700',
                color: '#1B4965',
                marginBottom: '12px',
              }}
            >
              Thank You!
            </h3>
            <p 
              style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '30px',
                lineHeight: '1.6',
              }}
            >
              Thank you for your contact, our team will contact you soon
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="btn btn-primary"
              style={{
                padding: '12px 30px',
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

export default ApplyNow;
