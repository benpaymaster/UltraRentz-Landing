import { motion } from "framer-motion";
import AnimatedButton from "./button";

export default function Hero() {
  const handleJoinPilot = () => {
    const target = document.querySelector("#cta");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative  flex flex-col justify-center items-start text-left pt-32 ">
      <motion.div
        className="absolute inset-0 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative px-8 py-12  w-full mx-auto  border-b border-white/30">
        <motion.h1
          className="text-2xl  md:text-4xl lg:text-6xl font-bold text-white leading-none mb-8 "
          style={{ fontFamily: "Unbounded, sans-serif" }}
        >
          TURN YOUR DEPOSITS
          <br />
          <motion.span className="text-cta-primary inline-block mr-2">
            INTO PROFIT
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-brutalist-sm md:text-xl text-white max-w-3xl mb-12 font-brutalist leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Earn income from your tenants rental deposits.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-start items-start"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={handleJoinPilot}
            className="px-12 py-4 bg-cta-primary/30  text-white font-brutalist font-bold text-lg tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-cta-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN PILOT
          </motion.button>

          <AnimatedButton defaultText="LEARN MORE" hoverText="LEARN MORE" />
        </motion.div>
      </div>
    </section>
  );
}
