import { Scale, MessageCircleWarning, Gavel, CheckCheck, Clock } from 'lucide-react';

export default function DisputeResolution() {
  return (
    <section className="py-24 px-4 md:px-12 bg-[#090b1a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Section Info */}
          <div className="space-y-8">
             <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                The Dispute <br/><span className="text-red-400">Resolution</span> Guarantee
              </h2>
               <p className="text-gray-400 text-lg">
                 What happens if someone "ghosts" or refuses to sign? <br/>
                 <span className="text-white">Your money is never "stuck" forever.</span>
               </p>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
               <h4 className="flex items-center gap-2 text-red-200 font-bold mb-3">
                 <Scale className="w-5 h-5" />
                 Neutral Arbitration
               </h4>
               <p className="text-gray-400 text-sm">
                 If a dispute arises, our neutral protocol arbitrators review the evidence (photos, chats, contracts) and provided the tie-breaking signature.
               </p>
            </div>
          </div>

          {/* Detailed Timeline Visual */}
          <div className="relative pl-8 border-l-2 border-gray-800 ml-12 md:ml-0 space-y-12 py-4">
             
             {/* Step 1 */}
             <div className="relative group">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#090b1a] group-hover:bg-red-500 transition-colors duration-300" />
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm hover:shadow-red-500/10 transition-all duration-300">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold">Dispute Raised</h4>
                      <MessageCircleWarning className="w-5 h-5 text-gray-400" />
                   </div>
                   <p className="text-gray-500 text-sm">Either party flags an issue. Funds are frozen instantly.</p>
                </div>
             </div>

             {/* Step 2 */}
             <div className="relative group">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#090b1a] group-hover:bg-orange-500 transition-colors duration-300" />
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm hover:shadow-orange-500/10 transition-all duration-300">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <h4 className="text-white font-bold">Evidence Window</h4>
                        <span className="text-orange-400 text-xs font-mono mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/> 14 DAYS</span>
                      </div>
                   </div>
                   <p className="text-gray-500 text-sm">Both parties submit photos, logs, and claims to the secure portal.</p>
                </div>
             </div>

             {/* Step 3 */}
             <div className="relative group">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#090b1a] group-hover:bg-green-500 transition-colors duration-300" />
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm hover:shadow-green-500/10 transition-all duration-300">
                   <div className="flex justify-between items-start mb-2">
                       <h4 className="text-white font-bold">Final Verdict</h4>
                       <Gavel className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                   </div>
                   <p className="text-gray-500 text-sm">Arbitrators review and sign the transaction. Funds are released according to the ruling.</p>
                </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
