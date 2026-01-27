import { Eye, TrendingUp, Database, Globe } from 'lucide-react';

export default function Transparency() {
  return (
    <section className="py-20 px-4 md:px-12 bg-gray-900/30 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Message First on Desktop for variation, but order-2 on mobile */}
          <div className="space-y-8 order-2 md:order-1">
             <div className="mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Real-Time <span className="text-blue-400">Transparency</span>
              </h2>
               <p className="text-gray-400 text-lg">
                Web2 banks are "Black Boxes"—you don't know what they do with your money. Web3 is an "Open Ledger."
              </p>
            </div>

            <div className="space-y-6">
              <div className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition duration-300">
                <div className="bg-blue-500/10 p-3 rounded-lg h-fit">
                   <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Visible 24/7</h3>
                   <p className="text-gray-400">
                    Verify your deposit exists on the blockchain at any time. No login required, just pure data.
                   </p>
                </div>
              </div>

               <div className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition duration-300">
                <div className="bg-cyan-500/10 p-3 rounded-lg h-fit">
                   <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Publicly Auditable</h3>
                   <p className="text-gray-400">
                    Anyone can audit the smart contract code and the funds held within it. Trust is established by transparency.
                   </p>
                </div>
              </div>
            </div>
             
             <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl">
               <p className="text-blue-200 italic">
                 "Total transparency. You can verify that your deposit exists on the blockchain 24/7, without having to trust a bank statement."
               </p>
             </div>
          </div>

          {/* Visual: Live Ticker */}
          <div className="order-1 md:order-2 bg-black border border-gray-800 rounded-2xl p-1 overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="bg-[#0f111a] rounded-xl p-6 md:p-8 relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent opacity-20 animate-scanline pointer-events-none" />

              <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                   <Database className="w-5 h-5 text-green-400" />
                   <span className="text-sm font-mono text-gray-400">ON-CHAIN PROOF OF RESERVES</span>
                </div>
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Live</span>
                 </div>
              </div>

              <div className="text-center py-8">
                 <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Total Value Locked</div>
                 <div className="text-5xl md:text-7xl font-mono text-white font-bold tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                   $4,285,910
                 </div>
                 <div className="text-green-400 mt-2 text-sm font-mono flex items-center justify-center gap-1">
                   <TrendingUp className="w-4 h-4" />
                   <span>+2.4% last 24h</span>
                 </div>
              </div>

              <div className="mt-8 space-y-2">
                 <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                    <span>Contract Address</span>
                    <span>Status</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded border border-gray-800">
                    <span className="text-blue-400 text-sm truncate max-w-[200px] md:max-w-none">0x71C...9A23</span>
                    <span className="text-green-400 text-xs px-2 py-1 bg-green-900/20 rounded border border-green-900/30">VERIFIED</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
