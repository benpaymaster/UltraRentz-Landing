import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-background-primary py-20 border-t-4 border-container-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="md:col-span-2">
            <motion.h3
              className="text-3xl font-bold text-text-primary mb-6 tracking-wide"
              style={{ fontFamily: "Unbounded, sans-serif" }}
              whileHover={{ scale: 1.05 }}
            >
              ULTRARENTZ
            </motion.h3>
            <p className="text-text-primary font-brutalist leading-relaxed mb-6 max-w-md">
              Revolutionizing rent deposits with secure, decentralized escrow
              and{" "}
              <span className="text-cta-primary font-semibold">URZ token</span>{" "}
              technology.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/Rahmanunjan/UltraRentz-MVP"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-container-bg text-white font-brutalist font-bold tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-container-bg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GITHUB
              </motion.a>
              <motion.a
                href="#cta"
                className="px-6 py-3 bg-transparent text-text-primary font-brutalist font-bold tracking-wide border-2 border-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-brutalist font-bold text-cta-primary mb-6 tracking-wide">
              PLATFORM
            </h4>
            <ul className="space-y-3">
              {["Features", "How It Works", "Security", "Developers"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="text-text-primary font-brutalist hover:text-cta-primary transition-colors duration-200 tracking-wide"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-brutalist font-bold text-cta-primary mb-6 tracking-wide">
              RESOURCES
            </h4>
            <ul className="space-y-3">
              {["Documentation", "Tutorials", "Blog", "Videos"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-text-primary font-brutalist hover:text-cta-primary transition-colors duration-200 tracking-wide"
                  >
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-primary font-brutalist tracking-wide mb-4 md:mb-0">
              © 2025 ULTRARENTZ. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-text-primary font-brutalist hover:text-cta-primary transition-colors duration-200 tracking-wide"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="text-text-primary font-brutalist hover:text-cta-primary transition-colors duration-200 tracking-wide"
              >
                TERMS OF SERVICE
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </footer>
  );
}
