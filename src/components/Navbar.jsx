import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiCode, HiMail, HiMenu, HiX } from "react-icons/hi";
import AnimatedButton from "./button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Developers", href: "#developers", icon: HiCode },
    { name: "Contact", href: "#footer", icon: HiMail },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -80;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      className=" bg-black fixed w-full z-40 border-b "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex justify-between items-center  px-6">
        <AnimatedButton defaultText="APY" hoverText="12.5%" />

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-r px-12 border-l border-white  h-full flex items-center justify-center">
          <motion.div
            className="text-3xl font-bold text-text-primary tracking-wide"
            style={{ fontFamily: "Unbounded, sans-serif" }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          >
            ULTRARENTZ
          </motion.div>
        </div>

        {/* Right side - Hamburger menu */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-primary focus:outline-none text-2xl z-10 p-2"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </motion.button>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Right Side Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-screen w-80  bg-black shadow-2xl z-40"
            style={{ borderLeft: `1px solid #ffffff` }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Close button inside navigation */}
            <div className="absolute top-6 right-6 z-50">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-text-primary focus:outline-none text-2xl p-2"
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
              >
                <HiX />
              </motion.button>
            </div>

            <div className="pt-24 px-6">
              <motion.ul className="space-y-6">
                {navLinks.map((link, idx) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.li
                      key={idx}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="flex items-center space-x-4 text-text-primary font-brutalist text-xl font-medium hover:text-white transition-all duration-200 py-3 px-4 "
                        style={{
                          color: "inherit",
                          ":hover": { color: "#50B2C0" },
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#50B2C0";
                          e.target.querySelector("svg").style.color = "#50B2C0";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "inherit";
                          e.target.querySelector("svg").style.color = "inherit";
                        }}
                      >
                        <IconComponent className="text-2xl" />
                        <span>{link.name.toUpperCase()}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
