"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGOS } from "@/assets/images";
import { RiMenu3Line } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const Header = ({ variant = "transparent" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [destinations, setDestinations] = useState([
    { name: "USA", href: "/destinations/USA" },
    { name: "Canada", href: "/destinations/Canada" },
    { name: "UK", href: "/destinations/UK" },
    { name: "Australia", href: "/destinations/Australia" },
  ]);
  const animationTriggeredRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch destinations from API
  const {
    mutate: fetchDestinations,
    data: destinationsResponse,
    isPending: isDestinationsLoading,
    isError: isDestinationsError,
  } = useMutation({
    mutationKey: ["destinations"],
    mutationFn: () => apiClient.get("/api/studies/destinations"),
    onSuccess: (response) => {
      if (response?.data && response.data.length > 0) {
        const destinationList = response.data.map((dest) => ({
          name: dest.name,
          href: `/destinations/${encodeURIComponent(dest.name)}`,
        }));
        setDestinations(destinationList);
      }
    },
  });

  useEffect(() => {
    fetchDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize animation state after hydration
  useEffect(() => {
    if (variant === "transparent" && window.scrollY <= 0) {
      setAnimateHeader(true);
      const timer = setTimeout(() => setAnimateHeader(false), 700);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Only add scroll listener if variant is transparent
    if (variant === "transparent") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [variant]);

  // Trigger slide-in animation only on initial load at top
  useEffect(() => {
    if (animationTriggeredRef.current) return;
    
    const atTop = window.scrollY <= 0;
    if (atTop && variant === "transparent") {
      animationTriggeredRef.current = true;
      const timer = setTimeout(() => setAnimateHeader(false), 700);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  const menuItems = [
    {
      name: "Destinations",
      href: "#",
      hasDropdown: true,
      submenu: destinations,
    },
    { name: "Scholarship", href: "/scholarship/all" },
    { name: "IELTS/PTE", href: "/ielts-pte" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact us", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const isActive = (item) => {
    if (item.hasDropdown) return pathname?.startsWith("/destinations");
    if (!item.href) return false;
    return pathname === item.href || pathname?.startsWith(`${item.href}/`);
  };

  return (
    <>
      <div
        className={`row flex justify-between p-10 header-content ${
          isScrolled || variant === "white" ? "scrolled" : ""
        } ${animateHeader ? "animate-header-slide" : ""}`}
      >
        <div className="header-wrapper">
          <div className="logo-container">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src={LOGOS.main}
                alt="FAM Consultancy"
                width={300}
                height={60}
                className="logo"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="header-menu-container desktop-menu">
            <ul className="menu-list flex gap-6 items-center">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="menu-item relative group"
                  onMouseEnter={() =>
                    item.hasDropdown && setOpenDropdown(item.name)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`menu-link flex items-center gap-1 ${
                      isActive(item) ? "active" : ""
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && item.submenu && (
                    <ul className="dropdown-menu group-hover:block">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.name}>
                          <a href={subitem.href} className="dropdown-link">
                            {subitem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Button */}
          <div className="header-btn-container desktop-btn">
            <button className="btn btn-secondary-gradient btn-jiggle" onClick={() => router.push("/apply-now")} aria-label="Go to apply now page">Free Consultancy</button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="mobile-menu-icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <RiMenu3Line size={25} className="menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Off-Canvas Menu */}
      <div className={`mobile-offcanvas ${isMobileMenuOpen ? "active" : ""}`}>
        {/* Overlay */}
        <div
          className={`offcanvas-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={`offcanvas-sidebar ${isMobileMenuOpen ? "active" : ""}`}
        >
          {/* Close Button */}
          <button
            className="offcanvas-close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Mobile Menu Items */}
          <nav className="mobile-menu-nav">
            <ul className="mobile-menu-list">
              {menuItems.map((item) => (
                <li key={item.name} className="mobile-menu-item">
                  {item.hasDropdown ? (
                    <>
                      <span
                        className={`mobile-menu-link flex items-center justify-between ${
                          isActive(item) ? "active" : ""
                        }`}
                        onClick={() => toggleDropdown(item.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.name}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease"
                          }}
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {/* Mobile Submenu */}
                      {openDropdown === item.name && item.submenu && (
                        <ul className="mobile-submenu">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.name}>
                              <a href={subitem.href} className="mobile-submenu-link">
                                {subitem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={`mobile-menu-link flex items-center justify-between ${
                        isActive(item) ? "active" : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Button */}
            <div className="mobile-btn-container">
              <button className="btn btn-secondary-gradient btn-jiggle" onClick={() => router.push("/apply-now")} aria-label="Go to apply now page">Free Consultancy</button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
