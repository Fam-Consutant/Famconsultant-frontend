import React from "react";
import PageLayout from "@/component/layouts/PageLayout";

export default function DestinationsLayout({ children }) {
  return (
    <PageLayout mainClassName="page-main-layout">{children}</PageLayout>
  );
}
