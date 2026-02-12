import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "Apply Now - Fam Consultancy",
};
export default function ApplyNowLayout({ children }) {
  return <PageLayout mainClassName="page-main-layout">{children}</PageLayout>;
}
