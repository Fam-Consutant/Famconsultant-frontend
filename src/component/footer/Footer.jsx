"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGOS } from "../../assets/images";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const Footer = ({ mainContent = true }) => {
  const [destinations, setDestinations] = useState([
    { name: "United Kingdom", href: "/destinations/uk" },
    { name: "Australia", href: "/destinations/australia" },
    { name: "Germany", href: "/destinations/germany" },
    { name: "Cyprus", href: "/destinations/cyprus" },
    { name: "Finland", href: "/destinations/finland" },
  ]);

  // Fetch destinations from API
  const {
    mutate: fetchDestinations,
  } = useMutation({
    mutationKey: ["footer-destinations"],
    mutationFn: () => apiClient.get("/api/studies/destinations"),
    onSuccess: (response) => {
      if (response?.data && response.data.length > 0) {
        // Shuffle and get 5 random destinations
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        const randomFive = shuffled.slice(0, 5);
        
        const destinationList = randomFive.map((dest) => ({
          name: dest.name,
          href: `/destinations/${encodeURIComponent(dest.name.toLowerCase())}`,
        }));
        setDestinations(destinationList);
      }
    },
  });

  useEffect(() => {
    fetchDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <footer className="footer-section">
      <div
        className="footer-overlay"
        style={{
          backgroundImage: mainContent
            ? " url('/images/footer-overlay.png')"
            : "none",
        }}
      >
        {mainContent && (
          <div className="footer-content">
            {/* Column 1 - Logo and Description */}
            <div className="footer-column footer-brand">
              <div className="footer-logo">
                <Image
                  src={LOGOS.main}
                  alt="Fam Consultant"
                  width={200}
                  height={60}
                  className="logo-img"
                />
              </div>
              <p className="footer-description">
                Trusted study abroad consultants helping students earn
                admissions, scholarships, and visas — guiding every step toward
                global success.
              </p>
              <div className="footer-social-icons">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="TikTok"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.59 6.69C18.09 5.61 17.1 4.02 17.1 2.19V2H13.27V15.42C13.27 16.71 12.21 17.77 10.92 17.77C9.63 17.77 8.57 16.71 8.57 15.42C8.57 14.13 9.63 13.07 10.92 13.07C11.23 13.07 11.53 13.13 11.81 13.23V9.33C11.52 9.29 11.23 9.27 10.92 9.27C7.54 9.27 4.77 12.04 4.77 15.42C4.77 18.8 7.54 21.57 10.92 21.57C14.3 21.57 17.07 18.8 17.07 15.42V8.81C18.39 9.72 19.96 10.23 21.63 10.23V6.43C20.89 6.43 20.19 6.63 19.59 6.69Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.498 6.186C23.498 6.186 23.268 4.562 22.604 3.889C21.776 2.999 20.852 2.995 20.426 2.943C17.052 2.7 12.005 2.7 12.005 2.7H11.995C11.995 2.7 6.948 2.7 3.574 2.943C3.148 2.995 2.224 2.999 1.396 3.889C0.732 4.562 0.507 6.186 0.507 6.186C0.507 6.186 0.275 8.062 0.275 9.937V11.763C0.275 13.639 0.502 15.514 0.502 15.514C0.502 15.514 0.732 17.138 1.391 17.811C2.219 18.701 3.298 18.674 3.786 18.768C5.666 18.938 12 18.996 12 18.996C12 18.996 17.052 18.988 20.426 18.75C20.852 18.698 21.776 18.694 22.604 17.804C23.268 17.131 23.498 15.507 23.498 15.507C23.498 15.507 23.725 13.636 23.725 11.76V9.934C23.725 8.059 23.498 6.186 23.498 6.186ZM9.545 14.509V7.601L15.818 11.067L9.545 14.509Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="footer-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/scholarship/all">Scholarship</Link>
                </li>
                <li>
                  <Link href="/ilets-pte">ILETS/PTE</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
                <li>
                  <Link href="/apply-now">Apply Now</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Destinations */}
            <div className="footer-column">
              <h3 className="footer-heading">Destinations</h3>
              <ul className="footer-links">
                {destinations.map((destination, index) => (
                  <li key={index}>
                    <Link href={destination.href}>{destination.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Us */}
            <div className="footer-column footer-contact">
              <h3 className="footer-heading">Contact us</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92V19.92C22 20.4696 21.7783 20.9968 21.3833 21.3874C20.9882 21.778 20.4531 21.9984 19.9 22C19.4423 22 19 21.89 18.56 21.68C13.84 19.68 9.5 16.78 6.03 12.97C2.96 9.58 1.19 5.91 0.28 2.24C0.18 1.86 0.12 1.47 0.12 1.08C0.12 0.56 0.32 0.06 0.68 -0.32C1.04 -0.7 1.53 -0.92 2.04 -0.92H5.04C5.56 -0.92 6.02 -0.72 6.37 -0.36C6.72 0 6.93 0.45 7 0.92L7.68 4.92C7.76 5.38 7.68 5.86 7.44 6.27C7.2 6.68 6.83 6.98 6.39 7.13L4.39 7.85C6.11 11.48 9.52 14.89 13.15 16.61L13.87 14.61C14.02 14.17 14.32 13.8 14.73 13.56C15.14 13.32 15.62 13.24 16.08 13.32L20.08 14C20.55 14.07 21 14.28 21.36 14.63C21.72 14.98 21.92 15.44 21.92 15.96L22 16.92Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>0325 6862000</span>
                </div>
                <div className="contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>info@famconsultant.com</span>
                </div>
                <div className="contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <span>
                    1st Floor Office 71 & 71 Mumtaz Market, Gujranwala
                  </span>
                </div>
                <div className="contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Monday - Saturday: 10 am–5:30 pm</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Footer Bottom */}
        <div
          className="footer-bottom"
          style={{ borderTop: mainContent ? "1px solid #000000" : "none" }}
        >
          <div
            className="footer-bottom-content"
            style={{ justifyContent: mainContent ? "space-between" : "center" }}
          >
            <p className="copyright">
              © 2026 Fam Consultant. All rights reserved | Made with ❤️ By <a href="https://spiraltech.com.co/" className="custom-link" target="_blank" rel="noopener noreferrer">Spiraltech</a>.
            </p>
            {mainContent && (
              <div className="footer-bottom-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-and-condition">Terms and Condition</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
