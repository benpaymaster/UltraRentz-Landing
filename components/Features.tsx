import { GlareCard } from "./ui/glare-card";

const features = [
  {
    title: "Secure Deposits",
    description:
      "Funds are held in multisig escrow to protect both tenants and landlords.",
  },
  {
    title: "Monetise Deposits",
    description:
      "Deposits held in URZ token can automatically earn yield or staking rewards. Your deposit is working for you, not sitting idle.",
  },
  {
    title: "Transparent Process",
    description: "Every step logged on-chain for full visibility.",
  },
  {
    title: "Fast Dispute Resolution",
    description:
      "Our DAO model guarantees a fair verdict in days, not the typical 30-90 day legal timeline. Funds released immediately upon approval, eliminating bank wait times.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-30 bg-zinc-800/30 px-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-300">
          Features
        </h2>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {features.map((feature, idx) => (
            <GlareCard key={idx} className="text-center p-6">
              <h3 className="text-xl font-semibold text-zinc-200">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-300">{feature.description}</p>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
}
