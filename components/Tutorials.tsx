"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const video = [
  {
    title: "TenantDepositing with UltraRentz: Tenant's First Steps",
    description:
      "The step-by-step guide to paying your security deposit and securely nominating your signatories.",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "TenantTracking Your Monetized Deposit: Watch Your Money Grow",
    description:
      `How to view your deposit's growth and understand the concept of a "working" deposit.`,
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "TenantThe Fast Track to Funds: Requesting Your Deposit Return",
    description:
      "he quick process for initiating your deposit return at the end of the lease and approving the release.",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "TenantTenant's Guide to URZ Token: What It Is and How to Get It",
    description:
      "A simple explanation of the URZ token and instructions on how to acquire it via a fiat-to-crypto gateway.",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function Tutorials() {
  return (
    <section id="turorials" className="py-20 bg-zinc-900/30 md:px-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-300">
          Tutorials
        </h2>
        {video.map((video, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              key={idx}
              className="mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 text-white border border-zinc-500 p-5 rounded-xl md:py-12 shadow-inner shadow-neutral-100/50 hover:shadow-neutral-100/70 transition-shadow"
            >
              <div
                className={cn(
                  "flex flex-col justify-center items-center",
                  idx % 2 !== 0 ? "sm:order-2" : "sm:order-1"
                )}
              >
                <p className="text-lg md:text-2xl font-semibold mb-4 text-center">
                  {video.title}
                </p>
                <p className="text-gray-300 text-center md:px-20">
                  Take a look at the introduction of UltraRentz. This will give
                  you a better understanding of how the platform works.
                </p>
              </div>
              <div
                className={cn(
                  "flex justify-center",
                  idx % 2 !== 0 ? "sm:order-1" : "sm:order-2"
                )}
              >
                <div>
                  <iframe
                    width="100%"
                    height="200"
                    src={video.embed}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
