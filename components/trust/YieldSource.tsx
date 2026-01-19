import { ArrowRightLeft, Wallet, Building2, TrendingUp } from 'lucide-react';

export default function YieldSource() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-purple-400">Yield Source</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
             "How can you give me 5% interest? Is this a scam?" <br/>
             <span className="text-white font-semibold">We don't "invest" your money.</span> We use decentralized, over-collateralized lending protocols.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card 1: The Protocols */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500/30 transition duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Institutional Grade</h3>
             <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              We integrate directly with <span className="text-white font-semibold">Aave</span> and <span className="text-white font-semibold">Morpho</span>. These are the gold standards of DeFi, handling billions in volume with audited security.
            </p>
            <div className="flex gap-4 items-center mt-auto opacity-70 grayscale hover:grayscale-0 transition duration-300">
               {/* Simple Text representation for logos to avoid external images breaking */}
               <div className="px-3 py-1 bg-white/10 rounded text-xs text-white font-bold">AAVE</div>
               <div className="px-3 py-1 bg-white/10 rounded text-xs text-white font-bold">MORPHO</div>
            </div>
          </div>

           {/* Card 2: How It Works */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500/30 transition duration-300 relative">
             <div className="absolute -top-4 -right-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Safe & Automated
             </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <ArrowRightLeft className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Over-Collateralized</h3>
             <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Borrowers must put up <span className="text-green-400">$1.50</span> in collateral for every <span className="text-white">$1.00</span> they borrow. If value drops, they are liquidated instantly to protect your principal.
            </p>
          </div>

           {/* Card 3: The Result */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500/30 transition duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Automated Yield</h3>
             <p className="text-gray-400 mb-6 text-sm leading-relaxed">
               Interest is paid every block (every ~12 seconds). Your idle capital works for you, generating a steady, low-risk return.
            </p>
            <div className="bg-green-900/20 border border-green-500/20 p-3 rounded-lg text-center">
               <span className="text-green-400 font-mono text-xl font-bold">~5.2% APY</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
