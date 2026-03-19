"use client";

import React from "react";
import dynamic from "next/dynamic";

const CipherCheckClient = dynamic(
  () => import("@/components/CipherCheckClient").then((m) => m.CipherCheckClient),
  { ssr: false },
);

export default function CipherCheckPage() {
  return <CipherCheckClient />;
}