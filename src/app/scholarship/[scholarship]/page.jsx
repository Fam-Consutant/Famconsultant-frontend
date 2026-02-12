"use client";

import React, { use, useState, useEffect, useMemo, useRef } from "react";
import PageTitle from "@/component/page-title/PageTitle";
import ScholarshipCard from "@/component/cards/scholarship-card/ScholarshipCard.jsx";
import CallToAction from "@/component/sections/CallToAction.jsx";
import ApplyNow from "@/component/sections/ApplyNow.jsx";
import { useRouter } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import Loader from "@/component/utils/Loader.jsx";

// Filter Content Component
const FilterContent = ({
  studyTypes,
  studyLevels,
  destinations,
  countries,
  studyTypesLoading,
  studyTypesFetching,
  destinationsLoading,
  destinationsFetching,
  handleStudyLevelChange,
  handleCountryChange,
}) => (
  <>
    {/* Study Level Filters */}
    <div className="filter-group">
      <h4 className="filter-title">By Study Level</h4>
      <div className="filter-options">
        {studyTypes.length > 0 ? (
          studyTypes.map((type) => (
            <label className="filter-checkbox" key={type.id}>
              <input
                type="checkbox"
                checked={studyLevels[type.id] || false}
                onChange={() => handleStudyLevelChange(type.id)}
              />
              <span>{type.name}</span>
            </label>
          ))
        ) : (
          <p className="no-data-text">No study levels available</p>
        )}
      </div>
    </div>

    {/* Country Filters */}
    <div className="filter-group">
      <h4 className="filter-title">By Destination</h4>
      <div className="filter-options">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <label className="filter-checkbox" key={destination.id}>
              <input
                type="checkbox"
                checked={countries[destination.id] || false}
                onChange={() => handleCountryChange(destination.id)}
              />
              <span>{destination.name}</span>
            </label>
          ))
        ) : (
          <p className="no-data-text">No destinations available</p>
        )}
      </div>
    </div>
  </>
);

const ScholarshipPage = ({ params }) => {
  const { scholarship } = use(params);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const scholarshipSectionRef = useRef(null);

  // Update document title dynamically
 

  // Fetch study types from API
  const { data: studyTypesResponse, isLoading: studyTypesLoading, isFetching: studyTypesFetching } = useQuery({
    queryKey: ["study-types"],
    queryFn: () => apiClient.get("/api/studies/study-types"),
  });

  // Fetch destinations from API
  const { data: destinationsResponse, isLoading: destinationsLoading, isFetching: destinationsFetching } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => apiClient.get("/api/studies/destinations"),
  });

  const studyTypes = useMemo(
    () => studyTypesResponse?.data || [],
    [studyTypesResponse?.data]
  );
  
  const destinations = useMemo(
    () => destinationsResponse?.data || [],
    [destinationsResponse?.data]
  );

  // Initialize filter states from API data
  const initialStudyLevels = useMemo(() => {
    const levels = {};
    if (studyTypes.length > 0) {
      studyTypes.forEach((type) => {
        levels[type.id] = false;
      });
    }
    return levels;
  }, [studyTypes]);

  const initialCountries = useMemo(() => {
    const countries = {};
    if (destinations.length > 0) {
      destinations.forEach((dest) => {
        countries[dest.id] = false;
      });
      
      // Auto-check destination if scholarship param matches a destination name
      if (scholarship && scholarship !== "all") {
        const matchingDestination = destinations.find(
          (dest) => dest.name.toLowerCase() === decodeURIComponent(scholarship).toLowerCase()
        );
        if (matchingDestination) {
          countries[matchingDestination.id] = true;
        }
      }
    }
    return countries;
  }, [destinations, scholarship]);

  // Filter states - Dynamic based on API response
  const [studyLevels, setStudyLevels] = useState(initialStudyLevels);
  const [countries, setCountries] = useState(initialCountries);
  const [minDisplayTime, setMinDisplayTime] = useState(0);
  const [forceRender, setForceRender] = useState(0);

  // Update filter states when initialized data changes
  useEffect(() => {
    setStudyLevels(initialStudyLevels);
  }, [initialStudyLevels]);

  useEffect(() => {
    setCountries(initialCountries);
  }, [initialCountries]);

  const handleStudyLevelChange = (levelId) => {
    setStudyLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const handleCountryChange = (countryId) => {
    setCountries((prev) => ({
      ...prev,
      [countryId]: !prev[countryId],
    }));
  };

  // Selected filters (IDs)
  const selectedDestinationIds = useMemo(
    () => Object.entries(countries)
      .filter(([, checked]) => checked)
      .map(([id]) => id),
    [countries]
  );

  const selectedStudyTypeIds = useMemo(
    () => Object.entries(studyLevels)
      .filter(([, checked]) => checked)
      .map(([id]) => id),
    [studyLevels]
  );

  // Scroll to scholarship section when filters change
  useEffect(() => {
    if (scholarshipSectionRef.current) {
      setTimeout(() => {
        scholarshipSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
    // Set minimum display time for loader (1 second = 1000ms)
    setMinDisplayTime(Date.now() + 1000);
    
    // Force re-render after 1 second to check if loader should hide
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedDestinationIds, selectedStudyTypeIds]);

  // Fetch scholarships with filters (paginated)
  const {
    data: scholarshipsResponse,
    isLoading: scholarshipsLoading,
    isFetching: scholarshipsFetching,
    isFetchingNextPage,
    isError: scholarshipsError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "scholarships",
      selectedDestinationIds.join(","),
      selectedStudyTypeIds.join(","),
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.get("/api/studies/scholarships", {
        params: {
          destinationIds:
            selectedDestinationIds.length
              ? selectedDestinationIds.join(",")
              : undefined,
          studyTypeIds:
            selectedStudyTypeIds.length
              ? selectedStudyTypeIds.join(",")
              : undefined,
          page: pageParam,
          limit: 20,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const pageSize = lastPage?.data?.length || 0;
      return pageSize === 20 ? allPages.length + 1 : undefined;
    },
    keepPreviousData: true,
  });

  const scholarshipsPages = scholarshipsResponse?.pages || [];
  const scholarships = useMemo(
    () => scholarshipsPages.flatMap((p) => p?.data || []),
    [scholarshipsPages]
  );

  // Determine if loader should show (API loading AND minimum 1 second hasn't passed)
  const shouldShowLoader = (scholarshipsLoading || scholarshipsFetching) && Date.now() < minDisplayTime;

  return (
    <>
      <div className="scholarship-container animate-on-load">
        <PageTitle
          pageName={"Scholarship"}
          backgroundImage={"scholarship-page-header.png"}
        />

        <div className="scholarship-container-content animate-on-scroll">
          {/* Desktop Filters */}
          <div className="scholarship-filters-section desktop-only animate-on-scroll">
            <FilterContent
              studyTypes={studyTypes}
              studyLevels={studyLevels}
              destinations={destinations}
              countries={countries}
              studyTypesLoading={studyTypesLoading}
              studyTypesFetching={studyTypesFetching}
              destinationsLoading={destinationsLoading}
              destinationsFetching={destinationsFetching}
              handleStudyLevelChange={handleStudyLevelChange}
              handleCountryChange={handleCountryChange}
            />
          </div>

          {/* Mobile Filter Button */}
          <button
            className="mobile-filter-button mobile-only animate-on-scroll"
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </button>

          {/* Mobile Off-Canvas Filter */}
          {isFilterOpen && (
            <>
              <div
                className="filter-overlay active"
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="filter-offcanvas active">
                <div className="filter-offcanvas-header">
                  <h3>Filters</h3>
                  <button
                    className="filter-close-btn"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="filter-offcanvas-body">
                  <FilterContent
                    studyTypes={studyTypes}
                    studyLevels={studyLevels}
                    destinations={destinations}
                    countries={countries}
                    studyTypesLoading={studyTypesLoading}
                    studyTypesFetching={studyTypesFetching}
                    destinationsLoading={destinationsLoading}
                    destinationsFetching={destinationsFetching}
                    handleStudyLevelChange={handleStudyLevelChange}
                    handleCountryChange={handleCountryChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="scholarships-card-section animate-on-scroll" ref={scholarshipSectionRef}>
            {/* Scholarship cards will be rendered here */}
            <div
              className="scholarship-cards-placeholder"
              style={{ position: 'relative', minHeight: '300px' }}
            >
              {scholarshipsError ? (
                <p className="error-text">Failed to load scholarships.</p>
              ) : scholarships.length > 0 ? (
                scholarships.map((sch) => (
                  <ScholarshipCard key={sch.id} scholarship={sch} />
                ))
              ) : (
                !shouldShowLoader && <p className="no-data-text">No scholarships found</p>
              )}

              {shouldShowLoader && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 5,
                  }}
                >
                  <Loader size="lg" message="Loading scholarships..." />
                </div>
              )}
            </div>

            {scholarships.length > 0 && hasNextPage && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading more..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Apply Now Section */}
        <div className="apply-now-section-container animate-on-scroll">
          <ApplyNow
            page={`${scholarship === "all" ? "scholarship" : scholarship}`}
          />
        </div>

        {/* CTA Section*/}
        <div className="cta-section-container animate-on-scroll">
          <CallToAction />
        </div>
      </div>
    </>
  );
};

export default ScholarshipPage;
