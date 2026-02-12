import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "MCQs Test - Fam Consultancy",
};
export default function MCQSTestLayout({ children }) {
  return <PageLayout mainClassName="page-main-layout" mainContent={false}>{children}</PageLayout>;
}
