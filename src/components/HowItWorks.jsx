import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "DEPOSIT IN URZ TOKEN",
    description: "Securely pay your rent deposit using URZ token.",
  },
  {
    number: "2",
    title: "NOMINATE SIGNATORIES",
    description: "Landlord  nominate 3 trusted signatories.",
  },
  {
    number: "3",
    title: "4-OF-6 APPROVAL",
    description: "Funds released only when 4 of the 6 signatories agree.",
  },
  {
    number: "4",
    title: "DAO DISPUTE RESOLUTION",
    description: "Our DAO resolves the issues fairly.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="py-24 relative overflow-hidden border-gray-600 border-t"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-container-bg/30 to-red-600/30"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white opacity-5 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="text-brutalist-lg font-bold text-white tracking-wider mb-6"
            style={{ fontFamily: "Unbounded, sans-serif" }}
          >
            HOW IT WORKS
          </h2>
          <div className="w-32 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-xl text-white font-brutalist max-w-2xl mx-auto leading-relaxed">
            Four simple steps to secure and transparent rent deposits
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
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
              <div className="absolute inset-6 flex items-center justify-center">
                {/* Number - top right, disappears on hover */}
                <div className="absolute top-0 right-0 text-right transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4">
                  <h3 className="text-brutalist-lg font-bold text-white leading-tight">
                    {step.number}
                  </h3>
                </div>

                {/* Content area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                  {/* Default description - fades out on hover */}
                  <div className="transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4 text-center">
                    <h3 className="text-xl font-brutalist font-bold text-white mb-4 tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 font-brutalist leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Expanded description - slides up on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 text-center">
                    <p className="text-white font-brutalist leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-12 py-4 bg-cta-primary/30 text-white font-brutalist font-bold text-lg tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-cta-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const target = document.querySelector("#developers");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
