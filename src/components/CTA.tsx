import React from "react";

export default function CTA() {
  return (
    <section className="py-20 cta-gradient-bg text-white text-center">
      <h2 className="text-4xl font-bold">Ready to Protect Your Deposit?</h2>
      <p className="mt-4 text-lg max-w-xl mx-auto">
        Join our pilot program and experience secure, transparent rent deposits today.
      </p>
      <button className="mt-8 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
        Join Pilot
      </button>
    </section>
  );
}
