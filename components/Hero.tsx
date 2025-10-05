import { Spotlight } from "@/components/ui/spotlight-new";
import { TextAnimate } from "./ui/text-animate";
import Link from "next/link";

export function Hero() {
  return (
    <div
      className="min-h-screen w-full rounded-md flex items-center justify-center antialiased relative overflow-hidden px-4 md:px-12"
      id="home"
    >
      <Spotlight />
      <div className="max-w-7xl w-full items-center flex flex-col gap-8">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-4xl md:text-7xl font-extrabold text-center animate-fade-in-down py-6 hover:scale-105 hover:-translate-y-1.5 transform transition duration-300">
          UltraRentz
        </h1>

        <div className="w-full text-white text-3xl md:text-4xl lg:text-6xl font-extrabold text-center animate-fade-in-up">
          Protect. Monetise. Resolve Disputes in Days, Not Months.
        </div>

        <TextAnimate className="text-blue-200 font-semibold text-center max-w-2xl md:text-2xl mt-4 px-16 md:px-2">
          Stop waiting 30+ days for your deposit return. Get fair, secure access
          to your funds, faster.
        </TextAnimate>
        <Link
          href="#cta"
          className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300 cursor-pointer animate-fade-in-up"
        >
          Start Protecting & Earning Now
        </Link>
      </div>
    </div>
  );
}
