import React from "react";
import Header from "@/component/header/Header";
import Footer from "@/component/footer/Footer";

const PageLayout = ({ children, mainClassName = "", mainContent = true }) => {
  // Reusable page shell for all non-home pages
  return (
    <>
      <Header variant="white" />
      <div className={mainClassName}>{children}</div>
      <Footer mainContent={mainContent} />
    </>
  );
};

export default PageLayout;
