import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "Contact - Fam Consultancy",
};
export default function ContactLayout({ children }) {
  return <PageLayout mainClassName="page-main-layout">{children}</PageLayout>;
}
