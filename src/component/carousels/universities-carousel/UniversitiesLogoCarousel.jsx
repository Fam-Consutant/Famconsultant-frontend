"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { resolveImageUrl } from "@/lib/resolveImageUrl";

const UniversitiesLogoCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["universities"],
    queryFn: () => apiClient.get("/api/studies/universities"),
    staleTime: 1000 * 60 * 5,
  });

  const items = Array.isArray(data?.data) ? data.data : [];
  const logos = items
    .filter((u) => !!u.imageUrl)
    .map((u) => ({ id: u.id, image: resolveImageUrl(u.imageUrl), alt: u.name }));

  return (
    <div className="universities-carousel-wrapper">
      <div className="universities-marquee" aria-label="Partner universities">
        <div className="universities-marquee__track">
          {isLoading && (
            <div className="logo-slide" aria-busy="true" aria-label="Loading logos" />
          )}
          {!isLoading && !isError && logos.length > 0 && (
            [...logos, ...logos].map((logo, idx) => (
              <div className="logo-slide" key={`${logo.id}-${idx}`}>
                <Image
                  src={logo.image}
                  alt={logo.alt || "University logo"}
                  width={150}
                  height={80}
                  className="university-logo"
                  priority={idx < logos.length}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversitiesLogoCarousel;
