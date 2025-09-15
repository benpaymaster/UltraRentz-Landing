import React from "react";

export default function Developers() {
  const tutorials = [
    { title: "Getting Started with UltraRentz", link: "#" },
    { title: "Integrate URZ Token in Your App", link: "#" },
    { title: "Understanding 4-of-6 Multisig Escrow", link: "#" },
  ];

  return (
    <section id="developers" className="container py-16 bg-blue-50 rounded-lg">
      <h2 className="text-3xl font-bold mb-10 text-center">Developers & Tutorials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {tutorials.map((tut, idx) => (
          <div key={idx} className="card p-6 fade-in">
            <h3 className="text-xl font-semibold mb-4">{tut.title}</h3>
            <a href={tut.link} className="text-blue-600 hover:underline">View Tutorial →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
