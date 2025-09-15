import React from "react";

export default function Blog() {
  const posts = [
    { title: "UltraRentz Launch Update", excerpt: "Learn about the new features and pilot program.", link: "#" },
    { title: "How to Pay Rent with URZ Tokens", excerpt: "Step-by-step guide for tenants and landlords.", link: "#" },
    { title: "DAO Dispute Resolution Explained", excerpt: "Fair and transparent dispute handling.", link: "#" },
  ];

  return (
    <section id="blog" className="container py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Blog</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div key={idx} className="card p-6 fade-in">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <a href={post.link} className="text-blue-600 hover:underline">Read More →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
