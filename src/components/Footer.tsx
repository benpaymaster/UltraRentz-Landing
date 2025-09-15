import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-20">
      <div className="max-w-7xl mx-auto text-center text-gray-600">
        <p>© 2025 UltraRentz. All rights reserved.</p>
        <div className="mt-3 space-x-4">
          <a href="https://github.com/Rahmanunjan/UltraRentz-MVP" className="hover:text-blue-600 transition">GitHub</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
