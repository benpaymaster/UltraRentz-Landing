import React from "react";
import { motion } from "framer-motion";

const steps = [
  { title: "Deposit in URZ Token", description: "Securely pay your rent deposit using URZ token." },
  { title: "Nominate Signatories", description: "Tenant & Landlord each nominate 3 trusted signatories." },
  { title: "4-of-6 Approval", description: "Funds released only when 4 of the 6 signatories agree." },
  { title: "DAO Dispute Resolution", description: "If there’s a dispute, our DAO resolves it fairly." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="card text-center p-6"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
