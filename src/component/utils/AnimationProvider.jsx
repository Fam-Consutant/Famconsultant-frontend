"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AnimationProvider = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") return;

    // Immediately reveal animate-on-load elements to avoid initial hidden state
    const loadTargets = document.querySelectorAll(".animate-on-load");
    loadTargets.forEach((el) => el.classList.add("in-view"));

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

    // Immediately mark items already in view to prevent staying invisible pre-scroll
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
      if (inViewport) {
        el.classList.add("in-view");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return children;
};

export default AnimationProvider;
