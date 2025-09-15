import React from "react";

const features = [
  { title: "Secure Deposits", description: "Funds are held in multisig escrow to protect both tenants and landlords." },
  { title: "Flexible Payments", description: "Pay deposits in URZ token or fiat via crypto swaps." },
  { title: "Transparent Process", description: "Every step logged on-chain for full visibility." },
  { title: "Fast Dispute Resolution", description: "DAO resolves disputes fairly and efficiently." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Features</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="card text-center p-6">
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
