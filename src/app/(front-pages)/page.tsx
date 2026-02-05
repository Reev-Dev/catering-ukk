"use client";

import HeroSection from "@/views/landing/HeroSection";
import FeatureSection from "@/views/landing/FeatureSection";
import PaketPreviewSection from "@/views/landing/PaketPreviewSection";
import StepSection from "@/views/landing/StepSection";
import PaymentSection from "@/views/landing/PaymentSection";
import TestimonialSection from "@/views/landing/TestimonialSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <PaketPreviewSection />
      <TestimonialSection />
      <StepSection />
      <PaymentSection />
    </>
  );
}
