"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GlossaryItem {
  term: string;
  definition: string;
  example?: string;
}

const glossaryItems: GlossaryItem[] = [
  {
    term: "Smart Contract",
    definition:
      "A smart contract is a self-executing program stored on a blockchain that automatically enforces the terms of an agreement when predetermined conditions are met. Think of it as a digital vending machine: you put in the right inputs, and it automatically delivers the outputs without needing a middleman.",
    example:
      "In UltraRentz, when a renter deposits their rent, the smart contract automatically holds the funds and releases them to the landlord only after confirming all conditions are satisfied.",
  },
  {
    term: "Multisig (Multi-Signature)",
    definition:
      "Multisig is a security feature that requires multiple parties to approve a transaction before it can be executed. Instead of one person having full control, several 'keys' must sign off, reducing the risk of fraud or unauthorized access.",
    example:
      "UltraRentz uses a 2-of-3 multisig setup where the renter, landlord, and UltraRentz each hold a key. Any two parties must agree to release or return the funds, ensuring no single party can act alone.",
  },
  {
    term: "Escrow Smart Contract",
    definition:
      "An escrow smart contract is a type of smart contract that holds funds securely until specific conditions are met. It acts as a neutral third party, ensuring that neither the buyer nor seller can access the funds until both have fulfilled their obligations.",
    example:
      "When you pay rent through UltraRentz, your funds go into an escrow smart contract. The landlord can only access the payment after confirming the rental period has started and all terms are met.",
  },
  {
    term: "DAO (Decentralized Autonomous Organization)",
    definition:
      "A DAO is an organization represented by rules encoded as a computer program that is transparent, controlled by organization members, and not influenced by a central authority. Members typically vote on decisions using governance tokens.",
    example:
      "UltraRentz governance allows token holders to vote on protocol upgrades, fee structures, and dispute resolution policies, ensuring the community has a say in how the platform evolves.",
  },
  {
    term: "Blockchain",
    definition:
      "A blockchain is a distributed digital ledger that records transactions across many computers in a way that makes it nearly impossible to alter retroactively. Each 'block' contains transaction data and is cryptographically linked to the previous block, forming a 'chain'.",
    example:
      "Every rental payment made through UltraRentz is recorded on the blockchain, creating an immutable record that both landlords and renters can verify at any time.",
  },
  {
    term: "Gas Fees",
    definition:
      "Gas fees are transaction costs paid to blockchain network validators for processing and confirming transactions. These fees fluctuate based on network demand and transaction complexity.",
    example:
      "When you make a rent payment on UltraRentz, a small gas fee is required to process the transaction on the blockchain. We optimize transactions to minimize these costs.",
  },
  {
    term: "Stablecoin",
    definition:
      "A stablecoin is a type of cryptocurrency designed to maintain a stable value by being pegged to a reserve asset like the US dollar. This eliminates the price volatility typically associated with cryptocurrencies.",
    example:
      "UltraRentz uses USDC (a dollar-pegged stablecoin) for rent payments, so landlords and renters don't have to worry about crypto price fluctuations affecting their rent amounts.",
  },
  {
    term: "Wallet",
    definition:
      "A crypto wallet is a digital tool that allows you to store, send, and receive cryptocurrencies. It contains your private keys (like a password) that prove ownership of your digital assets.",
    example:
      "To use UltraRentz, you'll connect a wallet like MetaMask or Coinbase Wallet. This wallet holds your funds and lets you securely sign transactions.",
  },
];

function GlossaryCard({ item, isOpen, onToggle }: { item: GlossaryItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30 hover:bg-gray-900/50 transition-colors">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-white">{item.term}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-3">
              <p className="text-gray-300 leading-relaxed">{item.definition}</p>
              {item.example && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold text-blue-400">In UltraRentz: </span>
                    {item.example}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Glossary() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="glossary" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Learn the Basics</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Glossary of <span className="text-purple-400">Terms</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            New to blockchain and crypto? Here's a simple guide to the key terms you'll encounter on UltraRentz.
          </p>
        </div>

        {/* Glossary Items */}
        <div className="space-y-3">
          {glossaryItems.map((item, index) => (
            <GlossaryCard
              key={item.term}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Still have questions?{" "}
            <a href="#cta" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
              Join our pilot program
            </a>{" "}
            and we'll help you get started.
          </p>
        </div>
      </div>
    </section>
  );
}
