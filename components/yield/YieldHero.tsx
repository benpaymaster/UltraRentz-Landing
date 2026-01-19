import { ArrowRight, Coins, TrendingUp } from 'lucide-react';

export default function YieldHero() {
  return (
    <section className="pt-32 pb-20 px-4 md:px-12 relative overflow-hidden bg-[#090b1a]">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 animate-fade-in-down">
          <Coins className="w-4 h-4" />
          <span>Stop Losing Money to Inflation</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-down">
          Turn Idle Deposits into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Active Revenue</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-fade-in-up">
          Traditional deposits sit in a bank account earning 0%. <br className="hidden md:block"/>
          With UltraRentz, your security deposits generate <span className="text-white font-bold">~5.2% APY</span> automatically through DeFi protocols.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up">
           <button className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2">
             Calculate Your Earnings
             <ArrowRight className="w-5 h-5" />
           </button>
           <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition duration-300 flex items-center justify-center gap-2">
             <TrendingUp className="w-5 h-5 text-gray-400" />
             View Protocol Stats
           </button>
        </div>
      </div>
    </section>
  );
}
