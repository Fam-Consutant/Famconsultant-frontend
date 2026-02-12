import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "Scholarship - Fam Consultancy",
};
export default function ScholarshipLayout({ children }) {
  return (
    <PageLayout mainClassName="page-main-layout">{children}</PageLayout>
  );
}
