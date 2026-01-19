import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import YieldHero from "@/components/yield/YieldHero";
import YieldCalculator from "@/components/yield/YieldCalculator";
import { House, ShieldCheck, Coins, Rocket } from "lucide-react";

const navItems = [
  { name: "Home", link: "/", icon: <House className="w-4 h-4 text-white" /> },
  { name: "Trust", link: "/trust", icon: <ShieldCheck className="w-4 h-4 text-white" /> },
  { name: "Yield", link: "#", icon: <Coins className="w-4 h-4 text-white" /> },
  { name: "Join Pilot", link: "/#cta", icon: <Rocket className="w-4 h-4 text-white" /> },
];

export default function YieldPage() {
  return (
    <main className="bg-mainbg min-h-screen">
      <FloatingNav navItems={navItems} />
      <YieldHero />
      <YieldCalculator />
      <Footer />
    </main>
  );
}
