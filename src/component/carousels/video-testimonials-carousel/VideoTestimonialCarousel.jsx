"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const VideoTestimonialCarousel = () => {
  const swiperRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [testimonials, setTestimonials] = useState([
    {
      id: "1",
      youtubeLink: "https://www.youtube.com/shorts/bDumtt14VP0",
      shortText: "Their guidance made studying abroad easy.",
      studentName: "Farhan Ali",
      university: "Sheffield Hallam University",
    },
    {
      id: "2",
      youtubeLink: "https://www.youtube.com/shorts/YacZbUbPyDg",
      shortText: "From course selection to visa filing, everything was handled professionally.",
      studentName: "Areej Khalid",
      university: "Victoria University, Australia",
    },
    {
      id: "3",
      youtubeLink: "https://www.youtube.com/shorts/m1oJZNWsiDk",
      shortText: "They guided me perfectly with documentation and interviews.",
      studentName: "Ahmed Hassan",
      university: "Seneca College, Canada",
    },
    {
      id: "4",
      youtubeLink: "https://www.youtube.com/shorts/KEFVDFtF6ww",
      shortText: "Their support and honest advice helped me choose the right university.",
      studentName: "Sarah Khan",
      university: "University of Hertfordshire, UK",
    },
  ]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
  };

  // Handle play button click
  const handlePlayVideo = (testimonialId) => {
    setPlayingVideo(testimonialId);
    // Stop autoplay when video is playing
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  // Handle closing video
  const handleCloseVideo = () => {
    setPlayingVideo(null);
    // Resume autoplay when video is closed
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  // Stop autoplay when any video is playing
  useEffect(() => {
    if (playingVideo && swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    } else if (!playingVideo && swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, [playingVideo]);

  // Fetch video testimonials from API
  const {
    mutate: fetchTestimonials,
    data: testimonialsResponse,
    isPending: isTestimonialsLoading,
  } = useMutation({
    mutationKey: ["video-testimonials"],
    mutationFn: () => apiClient.get("/api/others/video-testimonials"),
    onSuccess: (response) => {
      if (response?.data && response.data.length > 0) {
        setTestimonials(response.data);
      }
    },
  });

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="video-testimonial-carousel-container">
      {/* Navigation Arrows */}
      <div className="carousel-navigation">
        <button
          className="nav-btn nav-prev"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>
        <button
          className="nav-btn nav-next"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => {
          const videoId = getYouTubeVideoId(testimonial.youtubeLink);
          const thumbnail = getYouTubeThumbnail(testimonial.youtubeLink);
          const embedUrl = getYouTubeEmbedUrl(testimonial.youtubeLink);
          const isPlaying = playingVideo === testimonial.id;
          
          return (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                {/* Full Video Container with All Content Overlaid */}
                <div className="video-thumbnail-container">
                  {isPlaying && embedUrl ? (
                    // Show YouTube iframe when playing
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <iframe
                        src={embedUrl}
                        title={testimonial.studentName}
                        className="video-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: '12px'
                        }}
                      />
                      {/* Close button */}
                      <button
                        onClick={handleCloseVideo}
                        className="video-close-btn"
                        aria-label="Close video"
                        type="button"
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '18px',
                          zIndex: 10,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Show thumbnail when not playing */}
                      {thumbnail && (
                        <img
                          src={thumbnail}
                          alt={testimonial.studentName}
                          className="video-thumbnail"
                        />
                      )}
                      {/* Play Button Centered - Plays video inline */}
                      <div className="play-button-overlay">
                        <button 
                          onClick={() => handlePlayVideo(testimonial.id)}
                          className="play-button" 
                          aria-label="Play video"
                          type="button"
                        >
                          <FaPlay />
                        </button>
                      </div>
                      {/* Text Content Overlaid at Bottom */}
                      <div className="content-overlay">
                        <p className="testimonial-quote">"{testimonial.shortText}"</p>
                        <p className="testimonial-name">{testimonial.studentName}</p>
                        <p className="testimonial-university">
                          {testimonial.university}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoTestimonialCarousel;
