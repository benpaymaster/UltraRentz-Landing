import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 mt-20">
      <div className="max-w-7xl mx-auto text-center text-gray-400 border-t border-gray-700 pt-6">
        <p>© 2025 UltraRentz. All rights reserved.</p>
        <div className="mt-3 space-x-4">
          <Link
            href="https://github.com/Rahmanunjan/UltraRentz-MVP"
            target="_blank"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </Link>
          <a href="#contact" className="hover:text-blue-600 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
