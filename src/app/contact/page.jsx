import React from "react";
import PageTitle from "@/component/page-title/PageTitle";
import Image from "next/image";
import { ICONS } from "@/assets/images";
import ContactUsForm from "@/component/forms/contact-us/ContactUsForm";

const ContactUs = () => {
  return (
    <div className="services-page-container animate-on-load">
      <PageTitle
        pageName={"Contact Us"}
        backgroundImage={"contact-page-header.png"}
      />

      <div className="contact-content-container animate-on-scroll in-view">
        <div className="contact-content-section">
          <span>Get In Touch Today </span>
          <h3>Connect With Us For Support</h3>
          <p>
            Reach out anytime for quick assistance with admissions, visas, or
            guidance.
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
          <ContactUsForm page="Contact Us" shadow={true} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
