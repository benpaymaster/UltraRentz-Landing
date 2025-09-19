import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-32 bg-background-primary relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-container-bg/20 to-background-primary"></div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-container-bg opacity-20 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-cta-primary opacity-20 rotate-12 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-green opacity-10 rotate-45"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-brutalist-lg font-bold text-text-primary tracking-wider mb-8 leading-tight"
            style={{ fontFamily: "Unbounded, sans-serif" }}
          >
            READY TO GROW
            <br />
            <span className="text-cta-primary">YOUR DEPOSIT?</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-primary font-brutalist max-w-3xl mx-auto leading-relaxed mb-12">
            Join our pilot program and experience{" "}
            <span className="text-accent-green font-semibold">
              secure, transparent
            </span>{" "}
            rent deposits today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              className="px-16 py-5 bg-cta-primary text-white font-brutalist font-bold text-xl tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-cta-primary group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">JOIN PILOT</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-cta-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                JOIN PILOT
              </span>
            </motion.button>

            <motion.button
              className="px-16 py-5 bg-transparent text-text-primary font-brutalist font-bold text-xl tracking-wide border-2 border-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT US
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-text-primary p-6 border-2 border-container-bg">
            <h3 className="font-brutalist font-bold text-background-primary mb-2 tracking-wide">
              SECURE ESCROW
            </h3>
            <p className="text-gray-700 font-brutalist text-sm">
              Your funds are protected by multisig technology
            </p>
          </div>

          <div className="bg-text-primary p-6 border-2 border-container-bg">
            <h3 className="font-brutalist font-bold text-background-primary mb-2 tracking-wide">
              TRANSPARENT PROCESS
            </h3>
            <p className="text-gray-700 font-brutalist text-sm">
              Every transaction is recorded on-chain
            </p>
          </div>

          <div className="bg-text-primary p-6 border-2 border-container-bg">
            <h3 className="font-brutalist font-bold text-background-primary mb-2 tracking-wide">
              FAIR RESOLUTION
            </h3>
            <p className="text-gray-700 font-brutalist text-sm">
              DAO-powered dispute resolution system
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
