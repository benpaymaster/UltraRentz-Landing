"use client";
import { motion } from "motion/react";

const steps = [
  {
    title: "Deposit in URZ Token",
    description: "Securely pay your rent deposit using URZ token.",
  },
  {
    title: "Nominate Signatories",
    description: "Tenant & Landlord each nominate 3 trusted signatories.",
  },
  {
    title: "4-of-6 Approval",
    description: "Funds released only when 4 of the 6 signatories agree.",
  },
  {
    title: "DAO Dispute Resolution",
    description: "If there’s a dispute, our DAO resolves it fairly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-30 bg-zinc-800/30 px-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-300">
          How it Works
        </h2>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-br from-blue-900/10 to-blue-800/10 text-center p-6 shadow-inner bg-zinc-900/30 border border-zinc-700 hover:-translate-y-1.5 duration-300 hover:shadow-xl shadow-neutral-200/30 h-full"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-zinc-200">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
