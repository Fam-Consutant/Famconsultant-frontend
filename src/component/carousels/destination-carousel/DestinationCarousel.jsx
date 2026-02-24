"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { resolveImageUrl } from "@/lib/resolveImageUrl";
import { useRouter } from "next/navigation";

const DestinationCarousel = () => {
  const router = useRouter();
  const {
    mutate: fetchDestinations,
    data: destinationsResponse,
    isPending: isDestinationsLoading,
  } = useMutation({
    mutationKey: ["destinations"],
    mutationFn: () => apiClient.get("/api/studies/destinations?sortOrder=asc"),
  });

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const destinations = (destinationsResponse?.data || []).map((dest) => ({
    id: dest.id,
    imageUrl: resolveImageUrl(dest.imageUrl),
    title: dest.name,
    description: dest.shortText || dest.description,
    shortText: dest.shortText,
  }));

  useEffect(() => {
    console.log("Destinations:", destinations);
  }, [destinations]);

  return (
    <div className="carusol-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={3}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="destination-swiper"
      >
        {(isDestinationsLoading ? [] : destinations).map((destination) => (
          <SwiperSlide key={destination.id}>
            <div
              className="child-carusol"
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push(`/destinations/${encodeURIComponent(destination?.title || "")}`)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(
                    `/destinations/${encodeURIComponent(destination?.title || "")}`
                  );
                }
              }}
            >
              <Image
                src={destination.imageUrl}
                alt={destination.title}
                width={320}
                height={320}
                className="image-carusol"
              />
              <h3>{destination?.title}</h3>
              <p>{destination?.shortText}</p>
              <button type="button">
                <HiMiniArrowLongRight size={40} className="button-carusol-icon" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationCarousel;
