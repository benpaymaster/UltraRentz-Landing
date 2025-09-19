import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Developers() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const response = await fetch("/data/docs.json");
        const data = await response.json();
        setDocs(data);
      } catch (error) {
        console.error("Failed to load docs:", error);
      }
    };
    loadDocs();
  }, []);

  return (
    <section id="developers" className="py-24 border-gray-600 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-brutalist-lg font-bold text-text-primary tracking-wider mb-4"
            style={{ fontFamily: "Unbounded, sans-serif" }}
          >
            DEVELOPERS & TUTORIALS
          </h2>
          <div className="w-32 h-1 bg-cta-primary mx-auto mb-6"></div>
          <p className="text-xl text-text-primary font-brutalist max-w-2xl mx-auto leading-relaxed">
            Technical documentation and guides for building with UltraRentz
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {docs.map((tutorial, idx) => (
            <motion.div
              key={idx}
              className="group bg-[#201E1F] hover:bg-black border-2 border-gray-300 hover:border-gray-600 transition-all duration-500 relative overflow-hidden h-80 cursor-pointer"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "8px 8px 0px rgba(255,255,255,1)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Category tag */}
              <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1 bg-container-bg text-white text-xs font-brutalist font-bold tracking-wider">
                  {tutorial.category.toUpperCase()}
                </span>
              </div>

              {/* Content area */}
              <div className="absolute inset-6 flex flex-col justify-start">
                <h3 className="text-lg font-brutalist font-bold text-white leading-tight mb-4">
                  {tutorial.title}
                </h3>
                <p className="text-gray-300 font-brutalist leading-relaxed text-base mb-6">
                  {tutorial.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tutorial.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 bg-cta-primary text-white text-xs font-space-grotesk font-bold tracking-wide"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <motion.button
                  className="w-full py-3 bg-background-primary text-cta-primary font-brutalist font-bold tracking-wide border-2 border-background-primary hover:bg-cta-primary hover:text-white hover:border-cta-primary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  VIEW TUTORIAL →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-12 py-4 bg-cta-primary/30 text-white font-brutalist font-bold text-lg tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-cta-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL DOCS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
