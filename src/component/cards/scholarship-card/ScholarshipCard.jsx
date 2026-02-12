import React from "react";
import Image from "next/image";
import { IMAGES, ICONS } from "../../../assets/images.js";
import { useRouter } from "next/navigation";
import { resolveImageUrl } from "@/lib/resolveImageUrl";

const ScholarshipCard = ({ scholarship }) => {

  console.log("Scholarship Data:", scholarship);
  const router = useRouter();

  const name = scholarship?.name || "Scholarship";
  const universityName = scholarship?.universityName || "University";
  const destinationName = scholarship?.destinationName || "";
  const studyTypeName = scholarship?.studyTypeName || "";
  const fundingTypeName = scholarship?.fundingTypeName || "";
  const awardValue = scholarship?.awardValue;
  const description = scholarship?.shortDescription || "";
  const currency = scholarship?.destinationCurrency || "USD";

  const imageSrc = scholarship?.university?.imageUrl
    ? resolveImageUrl(scholarship.university.imageUrl)
    : IMAGES.universities.bristol;

  const formattedAward = awardValue
    ? `${currency} ${Number(awardValue).toLocaleString()}`
    : "Value of award";

  const descriptionLines = description
    ? description.split("\n").filter(Boolean)
    : [];

  return (
    <div className="scholarship-card">
      <div className="scholarship-header">
        <Image
          src={imageSrc}
          width={250}
          height={180}
          alt={universityName}
          className="institute-image"
        />
      </div>
      <div className="scholarship-content">
        <h4>{name}</h4>
        <p className="university-name">{universityName}</p>
        <div className="scholarship-features">
          {destinationName && (
            <div className="feature-item">
              <Image
                src={ICONS.location}
                width={20}
                height={20}
                alt="Location Icon"
                className="feature-icon"
              />
              <span className="feature-text">{destinationName}</span>
            </div>
          )}
          {studyTypeName && (
            <div className="feature-item">
              <Image
                src={ICONS.graduate}
                width={20}
                height={20}
                alt="Study Type Icon"
                className="feature-icon"
              />
              <span className="feature-text">{studyTypeName}</span>
            </div>
          )}
          {fundingTypeName && (
            <div className="feature-item">
              <Image
                src={ICONS.funding}
                width={20}
                height={20}
                alt="Funding Icon"
                className="feature-icon"
              />
              <span className="feature-text">{fundingTypeName}</span>
            </div>
          )}
          <div className="feature-item">
            <Image
              src={ICONS.value}
              width={20}
              height={20}
              alt="Value Icon"
              className="feature-icon"
            />
            <span className="feature-text">{formattedAward}</span>
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline"
        onClick={() => router.push("/apply-now")}
      >
        Apply Now
      </button>
    </div>
  );
};

export default ScholarshipCard;
