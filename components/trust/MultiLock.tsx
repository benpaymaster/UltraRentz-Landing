import { Key, ShieldCheck, Users, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function MultiLock() {
  return (
    <section className="py-20 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-6">
            "Multi-Lock" Security
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your deposit is protected by a consensus of the Landlord, Tenant, and UltraRent. 
            We've eliminated the risk of a single point of failure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual: 4 of 6 Keys */}
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="mb-6 text-blue-400 font-semibold bg-blue-900/20 px-4 py-1 rounded-full border border-blue-500/30">
                4-of-6 Logic Required
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${i < 4 ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-800/30 border-gray-700 opacity-50' } border`}>
                    <Key className={`w-8 h-8 ${i < 4 ? 'text-blue-400' : 'text-gray-500'}`} />
                    <span className="text-xs text-gray-400 font-mono">Key {i + 1}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-green-400 bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/20">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Consensus Reached</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-8">
             <div className="flex gap-4 items-start">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 mt-1">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Power in Numbers</h3>
                <p className="text-gray-400">
                   No one person—not even UltraRent—can touch the money alone. It requires agreement from multiple parties to unlock funds.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 mt-1">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Impossible to Drain</h3>
                <p className="text-gray-400">
                  Even if a hacker compromises one key, or an admin goes rogue, the funds remain secure. The "4-of-6" rule is enforceable by code.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 mt-1">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Trustless Architecture</h3>
                <p className="text-gray-400">
                  You don't need to trust a bank statement. You trust the math. The smart contract cannot be overridden by human error or malice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
