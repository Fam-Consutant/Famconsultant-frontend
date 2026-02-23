"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";



const GoogleReviewCarousel = ({ background }) => {
  const googleReviews = [
    {
      id: 1,
      initial: "Z",
      color: "#0d2b78",
      name: "Zainab Asghar",
      country: "Pakistan",
      review:
        "I had a wonderful experience with FAM Consultant. The staff was extremely professional and helpful throughout the entire consultation process. I highly recommend FAM Consultant for anyone planning to study abroad. Their advice is spot-on and their support is unmatched.",
      rating: 5,
    },
    {
      id: 2,
      initial: "F",
      color: "#50217e",
      name: "Noor Fatima",
      country: "Pakistan",
      review:
        "FAM Consultant's team is highly professional, responsive, and tuned into client needs. They delivered expert guidance and support, exceeding expectations with outstanding results. A top choice for reliable, efficient consulting services 👍",
      rating: 5,
    },
    {
      id: 3,
      initial: "M",
      color: "#5a0b0b",
      name: "Muhammad Ahmed",
      country: "Pakistan",
      review:
        "Their process is very smooth, and they genuinely care about your future. I’m glad I reached out to them. Fam consultants best consultant in gujranwala",
      rating: 4,
    },
    {
      id: 4,
      initial: "U",
      color: "#be16b6",
      name: "Nasir Iqbal",
      country: "Pakistan",
      review:
        "I recently visited the FAM Consultant office and was guided very professionally. The team was extremely helpful and knowledgeable. They answered all my questions patiently and provided clear direction about the study abroad process. Highly recommended for anyone looking for honest and expert advice!",
      rating: 5,
    },
    {
      id: 5,
      initial: "U",
      color: "#0475ff",
      name: "Amna Parveen",
      country: "Pakistan",
      review:
        "i got my visa process done by fam Consultant and successfully got admission in BPP London University two years ago , very coorporative team…!",
      rating: 5,
    },
  ];

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
        {googleReviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div
              className="google-review-card"
              style={background ? { backgroundColor: background } : undefined}
            >
              <div
                className="google-review-avatar"
                style={{ backgroundColor: review.color }}
              >
                <span>{review.initial}</span>
              </div>
              <p className="google-review-name">{review.name}</p>
              <p className="google-review-country">{review.country}</p>
              <p className="google-review-text">{review.review}</p>
              <div className="google-review-rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < review.rating ? "star filled" : "star"}
                  />
                ))}
              </div>
              <div className="google-review-logo">
                <FcGoogle size={32} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GoogleReviewCarousel;