import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen hero-gradient-bg flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
        Fair, Secure, Transparent Rent Deposits
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl">
        Decentralized escrow with URZ token and 4-of-6 multisig approval for tenants and landlords.
      </p>
      <button className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300">
        Join Pilot
      </button>
    </section>
  );
}
