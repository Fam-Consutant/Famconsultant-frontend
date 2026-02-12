import React from "react";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { useRouter } from "next/navigation";

const TestSection = ({ onButtonClick, activeTab }) => {
  const router = useRouter();
  return (
    <div className="free-pte-section">
      <div className="free-pte-section-wrapper">
        <div className="free-pte-section-image">
          <Image
            src={IMAGES.tickets.tickets}
            alt="findImage"
            width={600}
            height={600}
            className="free-pte-image"
          />
        </div>
        <div className="free-pte-section-content">
          <h3>
            Take the Free <span>PTE Mock Test</span> and Unlock Upto 50% OFF!
          </h3>
          <p>
            Test your English proficiency with our quick and reliable PTE mock
            exam. Score well, and instantly get Upto 50% off your complete PTE
            preparation course — limited-time offer for new students!
          </p>
          <button className="btn btn-primary" onClick={() => onButtonClick()}>
            Start My Free Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSection;
