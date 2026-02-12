import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "Services - Fam Consultancy",
};
export default function ServicesLayout({ children }) {
  return (
    <PageLayout mainClassName="page-main-layout">{children}</PageLayout>
  );
}
