import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import MultiLock from "@/components/trust/MultiLock";
import Transparency from "@/components/trust/Transparency";
import YieldSource from "@/components/trust/YieldSource";
import DisputeResolution from "@/components/trust/DisputeResolution";
import { House, Layers, ShieldCheck, Coins, Rocket } from "lucide-react";

const navItems = [
  { name: "Home", link: "/", icon: <House className="w-4 h-4 text-white" /> },
  { name: "Features", link: "/#features", icon: <Layers className="w-4 h-4 text-white" /> },
  { name: "Trust", link: "#", icon: <ShieldCheck className="w-4 h-4 text-white" /> },
  { name: "Yield", link: "/yield", icon: <Coins className="w-4 h-4 text-white" /> },
  { name: "Join Pilot", link: "/#cta", icon: <Rocket className="w-4 h-4 text-white" /> },
];

export default function TrustPage() {
  return (
    <main className="bg-mainbg min-h-screen">
      <FloatingNav navItems={navItems} />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Trust by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Design</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We don't ask you to trust us. We built a system where you don't have to.
        </p>
      </div>

      <MultiLock />
      <Transparency />
      <YieldSource />
      <DisputeResolution />
      
      <Footer />
    </main>
  );
}
