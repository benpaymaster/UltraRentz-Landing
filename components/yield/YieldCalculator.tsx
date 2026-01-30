"use client";

import { useState, useMemo } from 'react';
import { CircleDollarSign, Building, Wallet, TrendingUp, Info } from 'lucide-react';
import { motion } from 'motion/react';

const APY_RATE = 0.052; // 5.2%
const TRADITIONAL_RATE = 0.001; // 0.1%

export default function YieldCalculator() {
  const [numProperties, setNumProperties] = useState(1);
  const [avgDeposit, setAvgDeposit] = useState(2500);

  const totalCapital = useMemo(() => numProperties * avgDeposit, [numProperties, avgDeposit]);
  const annualYield = useMemo(() => totalCapital * APY_RATE, [totalCapital]);
  const monthlyYield = useMemo(() => annualYield / 12, [annualYield]);
  const traditionalYield = useMemo(() => totalCapital * TRADITIONAL_RATE, [totalCapital]);

  const earningsDiff = annualYield - traditionalYield;

  return (
    <section className="py-20 px-4 md:px-12 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12">
            
            {/* Input Section */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <CircleDollarSign className="w-6 h-6 text-green-400" />
                Estimate Your Returns
              </h3>

              <div className="space-y-12">
                {/* Num Properties Input */}
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-gray-400 font-medium flex items-center gap-2">
                      <Building className="w-4 h-4" /> Number of Properties
                    </label>
                    <span className="text-2xl font-bold text-white tabular-nums">{numProperties}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    step="1"
                    value={numProperties}
                    onChange={(e) => setNumProperties(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1</span>
                    <span>50</span>
                    <span>100+</span>
                  </div>
                </div>

                {/* Avg Deposit Inout */}
                <div>
                   <div className="flex justify-between mb-4">
                    <label className="text-gray-400 font-medium flex items-center gap-2">
                      <Wallet className="w-4 h-4" /> Avg. Deposit Value ($)
                    </label>
                    <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1 text-white border border-gray-700 focus-within:border-blue-500">
                         <span className="text-gray-500 mr-1">$</span>
                         <input 
                            type="number" 
                            value={avgDeposit} 
                            onChange={(e) => setAvgDeposit(Math.max(0, parseInt(e.target.value) || 0))}
                            className="bg-transparent outline-none w-20 font-bold text-right"
                         />
                    </div>
                  </div>
                   <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="100"
                    value={avgDeposit}
                    onChange={(e) => setAvgDeposit(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                  />
                   <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$500</span>
                    <span>$5,000</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </div>

               <div className="mt-12 p-6 bg-blue-900/10 rounded-xl border border-blue-500/10">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-gray-400 font-medium">Total Idle Capital</span>
                     <span className="text-2xl font-mono text-white font-bold">
                        ${totalCapital.toLocaleString()}
                     </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    This is the money currently sitting in your bank account doing nothing.
                  </p>
               </div>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-5 bg-gradient-to-b from-gray-900 to-black p-8 md:p-12 flex flex-col justify-center relative">
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent lg:hidden" />
               
               <div className="text-center mb-10">
                 <span className="text-gray-400 text-sm uppercase tracking-widest">Projected Annual Yield</span>
                 <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-600 mt-2 mb-2">
                   ${Math.round(annualYield).toLocaleString()}
                 </div>
                 <span className="text-green-500 font-medium text-sm bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
                    +${Math.round(monthlyYield).toLocaleString()} / month
                 </span>
               </div>

               <div className="space-y-4">
                  {/* Comparison Logic */}
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                        <span className="text-white font-medium">UltraRentz (5.2%)</span>
                        <span className="text-green-400 font-bold">${Math.round(annualYield).toLocaleString()}</span>
                     </div>
                     <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                        />
                     </div>
                  </div>

                  <div className="space-y-2 opacity-50">
                     <div className="flex justify-between text-sm">
                        <span className="text-white font-medium">Traditional Bank (0.1%)</span>
                        <span className="text-gray-400 font-bold">${Math.round(traditionalYield).toLocaleString()}</span>
                     </div>
                     <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "2%" }} // Visual approximation
                           className="h-full bg-gray-500"
                        />
                     </div>
                  </div>
               </div>

               <div className="mt-10 p-4 bg-green-900/10 border border-green-500/20 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-green-400 shrink-0" />
                  <p className="text-xs text-green-200">
                     You could earn an extra <span className="font-bold text-white">${Math.round(earningsDiff).toLocaleString()}</span> per year just by switching to UltraRentz deposits.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
