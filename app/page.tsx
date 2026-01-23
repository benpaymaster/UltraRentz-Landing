import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Glossary from "@/components/Glossary";
import { Hero } from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Tutorials from "@/components/Tutorials";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Layers, Workflow, PlayCircle, FileText, Rocket, ShieldCheck, Coins, BookOpen } from "lucide-react";

const navItems = [
  {
    name: "Features",
    link: "#features",
    icon: <Layers className="w-4 h-4 text-white" />,
  },
  {
    name: "How It Works",
    link: "#how-it-works",
    icon: <Workflow className="w-4 h-4 text-white" />,
  },
  // {
  //   name: "Tutorials",
  //   link: "#turorials",
  //   icon: <PlayCircle className="w-4 h-4 text-white" />,
  // },
  {
    name: "Blog",
    link: "#blog",
    icon: <FileText className="w-4 h-4 text-white" />,
  },
  {
    name: "Glossary",
    link: "#glossary",
    icon: <BookOpen className="w-4 h-4 text-white" />,
  },
  {
    name: "Trust",
    link: "/trust",
    icon: <ShieldCheck className="w-4 h-4 text-white" />,
  },
   {
    name: "Yield",
    link: "/yield",
    icon: <Coins className="w-4 h-4 text-white" />,
  },
  {
    name: "Join Pilot",
    link: "#cta",
    icon: <Rocket className="w-4 h-4 text-white" />,
  },
];

export default function Home() {
  return (
    <div>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Tutorials /> */}
      <Blog/>
      <Glossary/>
      <CTA/>
      <Footer/>
    </div>
  );
}
