"use client";

import dynamic from "next/dynamic";

const FlagsLottieComponent = dynamic(() => import("./FlagsLottieClient"), {
  ssr: false,
  loading: () => <div style={{ width: 400, height: 400 }} />,
});

export default function HeroFlagsAnimation() {
  return <FlagsLottieComponent />;
}
