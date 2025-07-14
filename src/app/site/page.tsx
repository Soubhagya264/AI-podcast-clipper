import React from 'react';
import { Hero } from '../_components/Hero';
import { Features } from '../_components/Features';
import { ClipHero } from '../_components/ClipHero';
import  {HowItWorks}  from '../_components/HowItWorks';
import { LeadSources } from '../_components/LeadSources';
import {TestimonialCards} from '../_components/TestimonialCards';
import {AwardsSection} from '../_components/AwardsSection';
import {ProductShowcase} from '../_components/ProductShowcase';
import {CTASection} from '../_components/CTASection';
import { Footer } from '../_components/Footer';



const page = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/40 to-blue-950/40 text-white overflow-x-hidden dark:bg-gradient-to-br dark:from-gray-950 dark:via-purple-950/40 dark:to-blue-950/40 dark:text-white light:bg-gradient-to-br light:from-gray-50 light:via-blue-50/30 light:to-indigo-100/30 light:text-gray-900">
        <Hero />
        <div className="bg-gradient-to-b from-transparent via-purple-950/20 to-blue-950/20 dark:from-transparent dark:via-purple-950/20 dark:to-blue-950/20 light:from-transparent light:via-blue-50/20 light:to-indigo-100/20">
          <Features />
          <ClipHero />
          <HowItWorks />
          <LeadSources />
          <TestimonialCards />
          <AwardsSection />
          <ProductShowcase />
          <CTASection />
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default page;
