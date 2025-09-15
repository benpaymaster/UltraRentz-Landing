import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#howitworks" },
    { name: "Developers", href: "#developers" },
    { name: "Videos", href: "#videos" },
    { name: "Blog", href: "#blog" },
    { name: "Join Pilot", href: "#cta" },
  ];

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -80; // Adjust based on navbar height
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false); // Close mobile menu after click
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">UltraRentz</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none text-2xl"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-lg">
          {navLinks.map((link, idx) => (
            <li key={idx} className="border-b">
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block px-6 py-4 text-gray-700 hover:bg-blue-50 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
