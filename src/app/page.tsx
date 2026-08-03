import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { IndustriesGrid } from '@/components/sections/IndustriesGrid';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CTABanner } from '@/components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PhilosophySection />
      <ServicesOverview />
      <IndustriesGrid />
      <WhyChooseUs />
      <ProcessTimeline />
      <CTABanner />
    </>
  );
}
