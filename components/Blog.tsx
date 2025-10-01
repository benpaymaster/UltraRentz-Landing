"use client";
import { motion } from "motion/react";
import Link from "next/link";

const posts = [
  {
    title: "UltraRentz Launch Update",
    excerpt: "Learn about the new features and pilot program.",
    link: "#",
  },
  {
    title: "How to Pay Rent with URZ Tokens",
    excerpt: "Step-by-step guide for tenants and landlords.",
    link: "#",
  },
  {
    title: "DAO Dispute Resolution Explained",
    excerpt: "Fair and transparent dispute handling.",
    link: "#",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-zinc">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-300 p-1">
          Blog
        </h2>
        <div className="mt-20 flex justify-around gap-6 flex-wrap">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-br from-blue-900/10 to-blue-800/10 text-center p-6 shadow-inner bg-zinc-900/30 border border-zinc-700 hover:-translate-y-1.5 duration-300 hover:shadow-xl shadow-neutral-200/30 flex flex-col gap-4"
              >
                <h3 className="text-xl font-semibold text-zinc-200">
                  {post.title}
                </h3>
                <p className="text-gray-300">{post.excerpt}</p>
                <Link
                  href={post.link}
                  className="text-blue-600 hover:underline flex justify-center mt-3"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
