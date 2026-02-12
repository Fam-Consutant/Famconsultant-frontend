import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "About - Fam Consultancy",
};
export default function AboutLayout({ children }) {
  return <PageLayout mainClassName="ielts-page-layout">{children}</PageLayout>;
}
