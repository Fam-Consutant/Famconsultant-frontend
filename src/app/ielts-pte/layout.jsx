import React from "react";
import PageLayout from "@/component/layouts/PageLayout";
export const metadata = {
  title: "Ielts/PTE - Fam Consultancy",
};
export default function IeltsPteLayout({ children }) {
  return (
    <PageLayout mainClassName="ielts-page-layout">{children}</PageLayout>
  );
}
