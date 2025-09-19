import { motion } from "framer-motion";
import { useEffect } from "react";
import Blog from "../components/Blog";
import CTA from "../components/CTA";
import Developers from "../components/Developers";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Videos from "../components/Videos";

export default function Landing() {
  useEffect(() => {
    // Enhanced smooth scrolling
    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }

      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #201E1F;
      }

      ::-webkit-scrollbar-thumb {
        background: #FF4000;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #50B2C0;
      }

      /* Disable scroll-padding-top for smooth anchoring */
      * {
        scroll-padding-top: 100px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <motion.div
      className="font-brutalist"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Developers />
        <Videos />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
}
