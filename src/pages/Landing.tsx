import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Developers from "../components/Developers";
import Videos from "../components/Videos";
import Blog from "../components/Blog";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Developers />
      <Videos />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}
