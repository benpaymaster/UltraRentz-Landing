"use client";

import { motion } from "motion/react";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Adegbenga Ogungbeje",
    role: "Founder & Lead Architect",
    image: "../ceo.jpeg",
    bio: "Adegbenga is a veteran smart contract engineer with 6 years of experience building secure, scalable decentralized systems. A Polkadot Academy Alumni and winner of the ETH Sofia Hackathon, he specializes in bridging complex blockchain architecture with real-world utility. At UltraRentz, Adegbenga is leveraging his deep expertise in Solidity and multi-chain infrastructure to build the UK's first compliant digital escrow layer for the £5.4bn rental deposit market—transforming a legacy legal process into a high-yield, automated financial asset.",
    linkedin: null as string | null,
  },
  {
    name: "Kehinde Fagbenro",
    role: "Contributor",
    image: "../kenny.jpg",
    
    bio: "Kehinde is a skilled Full-Stack Web3 Engineer specialising in building secure, performant, and accessible decentralised applications. He works across the stack with React and Next.js on the frontend, and has working knowledge of Web3 technologies including Solidity, smart contracts, and wallet integration libraries. At UltraRentz, Kehinde is responsible for building and maintaining tenant- and landlord-facing dashboards, ensuring that interacting with smart-contract-based escrow systems feels as seamless and intuitive as using any modern fintech product.",
    linkedin: null as string | null,
  },
  // {
  //   name: "Jason Aw",
  //   role: "Contributor",
  //   // TODO: Replace with actual image path, e.g. "/team/jason.jpg"
  //   image: "../jason.jpg",
  //   bio: "Jason is a veteran web3 engineer with 3 years of experience building secure, scalable decentralized systems. A Polkadot Academy Alumni, he specializes in bridging complex blockchain architecture with real-world utility. At UltraRentz, Jason is leveraging his full-stack skills to build the UK’s first compliant digital escrow layer for the £5.4bn rental deposit market—transforming a legacy legal process into a high-yield, automated financial asset.",
  //   linkedin: null as string | null,
  // },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Meet the <span className="text-blue-400">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The engineers building the future of rental deposits in the UK.
          </p>
        </div>

        <div className="md:flex gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors mt-5 md:mt-0"
            >
              {/* Image placeholder */}
              <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-gray-700 flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-400">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mt-1">{member.role}</p>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                {member.bio}
              </p>

              {member.linkedin && (
                <div className="mt-4 flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
