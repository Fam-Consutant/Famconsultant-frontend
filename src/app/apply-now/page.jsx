import React from "react";
import PageTitle from "@/component/page-title/PageTitle";
import Image from "next/image";
import { ICONS } from "@/assets/images";
import ApplyNowform from "@/component/forms/apply-now/ApplyNow";

const ApplyNow = () => {
  return (
    <div className="services-page-container animate-on-load">
      <PageTitle
        pageName={"Apply Now"}
        backgroundImage={"apply-now-page-header.png"}
      />

      <div className="contact-content-container animate-on-scroll">
        <div className="contact-content-section">
          <span>Your Future Starts With One Step </span>
          <h3>Let’s Help You Apply Successfully</h3>
          <p>
            Whether you need guidance for admissions or visa filing, our
            consultants are ready to help.
          </p>

          <div className="contact-icon-container">
            <div className="contact-icon">
              <Image
                src={ICONS.phone_number}
                width={32}
                height={32}
                alt="Location Icon"
              />
            </div>
            <div className="contact-icon-text">
              <p>Phone Number</p>
              <h5>0325 6862000</h5>
            </div>
          </div>
          <div className="contact-icon-container">
            <div className="contact-icon">
              <Image
                src={ICONS.envalop}
                width={32}
                height={32}
                alt="Location Icon"
              />
            </div>
            <div className="contact-icon-text">
              <p>Email</p>
              <h5>info@famconsultant.com</h5>
            </div>
          </div>
        </div>
        <div className="contact-form-section">
          <ApplyNowform page="apply-now" shadow={true} />
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
