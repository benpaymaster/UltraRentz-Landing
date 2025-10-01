import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Tutorials from "@/components/Tutorials";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Image from "next/image";

const navItems = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "How It Works",
    link: "#how-it-works",
  },
  {
    name: "Tutorials",
    link: "#turorials",
  },
  {
    name: "Blog",
    link: "#blog",
  },
  {
    name: "Join Pilot",
    link: "#cta",
  },
];

export default function Home() {
  return (
    <div>
      <FloatingNav navItems={navItems} className="hidden md:flex"/>
      <Hero />
      <Features />
      <HowItWorks />
      <Tutorials />
      <Blog/>
      <CTA/>
      <Footer/>
    </div>
  );
}
