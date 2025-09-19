import { motion, useMotionValue, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

// Inline SVG components to replace react-icons/fa
const ShieldAltIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M495.9 448.4c-4.4-4.4-10.4-6.9-16.9-6.9H32.9c-6.5 0-12.5 2.5-16.9 6.9C11.6 452.9 8 459.1 8 465.9v28.2c0 10.7 8.7 19.3 19.3 19.3h457.4c10.7 0 19.3-8.7 19.3-19.3v-28.2c0-6.8-3.6-13-10.1-17.5zm-22.3-43.2H41.6V78.7c0-10.7 8.7-19.3 19.3-19.3h44.6V39.4c0-10.7 8.7-19.3 19.3-19.3h175.6c10.7 0 19.3 8.7 19.3 19.3v20H448c10.7 0 19.3 8.7 19.3 19.3v326.5zm-59.5-274.6c0-1.8-1.5-3.3-3.3-3.3h-44.6v-20c0-1.8-1.5-3.3-3.3-3.3h-175.6c-1.8 0-3.3 1.5-3.3 3.3v20H132.3c-1.8 0-3.3 1.5-3.3 3.3v274.6H414.1V128.7zM256 182.2c-47.5 0-86 38.5-86 86s38.5 86 86 86 86-38.5 86-86-38.5-86-86-86zM256 327.9c-32.5 0-59-26.5-59-59s26.5-59 59-59 59 26.5 59 59-26.5 59-59 59z"
    />
  </svg>
);
const ExchangeAltIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M370.7 205.3L400 176c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L308.7 176c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 184v48H208c-17.7 0-32-14.3-32-32s14.3-32 32-32h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H208c-53 0-96 43-96 96v24H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H112v24c0 53 43 96 96 96h176c17.7 0 32-14.3 32-32s-14.3-32-32-32H208c-17.7 0-32-14.3-32-32s14.3-32 32-32h176v-48l-29.3-29.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0z"
    />
  </svg>
);
const LinkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M326.7 131.5L273.4 89c-24.8-19.4-58.4-19.4-83.2 0L32.7 217.5c-29.7 23.2-32.6 65.5-6.9 92.3 25.7 26.8 68.6 29.8 98.3 6.6L160 288v96c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-96l38.7 30.3c29.7 23.2 72.6 20.2 98.3-6.6 25.7-26.8 22.8-69.1-6.9-92.3L326.7 131.5zM256 160c-17.7 0-32 14.3-32 32v64h64v-64c0-17.7-14.3-32-32-32zM80 32c0-17.7 14.3-32 32-32h288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32h-64c-17.7 0-32 14.3-32 32v96h-64v-96c0-17.7-14.3-32-32-32h-64c-17.7 0-32-14.3-32-32V32z"
    />
  </svg>
);
const BalanceScaleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M495.9 448.4c-4.4-4.4-10.4-6.9-16.9-6.9H32.9c-6.5 0-12.5 2.5-16.9 6.9C11.6 452.9 8 459.1 8 465.9v28.2c0 10.7 8.7 19.3 19.3 19.3h457.4c10.7 0 19.3-8.7 19.3-19.3v-28.2c0-6.8-3.6-13-10.1-17.5zm-22.3-43.2H41.6V78.7c0-10.7 8.7-19.3 19.3-19.3h44.6V39.4c0-10.7 8.7-19.3 19.3-19.3h175.6c10.7 0 19.3 8.7 19.3 19.3v20H448c10.7 0 19.3 8.7 19.3 19.3v326.5zm-59.5-274.6c0-1.8-1.5-3.3-3.3-3.3h-44.6v-20c0-1.8-1.5-3.3-3.3-3.3h-175.6c-1.8 0-3.3 1.5-3.3 3.3v20H132.3c-1.8 0-3.3 1.5-3.3 3.3v274.6H414.1V128.7zM256 182.2c-47.5 0-86 38.5-86 86s38.5 86 86 86 86-38.5 86-86-38.5-86-86-86zM256 327.9c-32.5 0-59-26.5-59-59s26.5-59 59-59 59 26.5 59 59-26.5 59-59 59z"
    />
  </svg>
);

const iconMap = {
  FaShieldAlt: ShieldAltIcon,
  FaExchangeAlt: ExchangeAltIcon,
  FaLink: LinkIcon,
  FaBalanceScale: BalanceScaleIcon,
};

// Data arrays for scrolling text and features
const scrollingTexts = [
  "CONVERT RENTERS DEPOSIT TO INCOME",
  "GENERATE INCOME THROUGH PASSIVE INVESTMENT",
  "BACKED BY 15+ PROPERTIES",
  "EASY ONBOARDING",
  "EASIER OFFRAMPING",
  "PUBLIC SMART CONTRACTS",
  "PUBLIC INFRASTRUCTURE",
  "TRANSPARENT MULTISIG ESCROW",
  "DAO GOVERNANCE MODEL",
  "AUTOMATED DISPUTE RESOLUTION",
  "REAL-TIME YIELD TRACKING",
  "INSTITUTIONAL GRADE SECURITY",
];

const features = [
  {
    title: "SECURE DEPOSITS",
    description:
      "Funds are held in multisig escrow to protect both tenants and landlords.",
    expandedDescription:
      "Our 4-of-6 multisig wallet system ensures maximum security. Deposits are protected by institutional-grade cryptographic security with multiple validators required for any transaction. Smart contracts are audited and battle-tested across thousands of transactions.",
    icon: "FaShieldAlt",
  },
  {
    title: "FLEXIBLE PAYMENTS",
    description: "Pay deposits in URZ token or fiat via crypto swaps.",
    expandedDescription:
      "Accept payments in URZ tokens, major cryptocurrencies, or traditional fiat currency. Our integrated swap functionality provides seamless conversion at competitive rates. Support for bank transfers, credit cards, and wire transfers.",
    icon: "FaExchangeAlt",
  },
  {
    title: "TRANSPARENT PROCESS",
    description: "Every step logged on-chain for full visibility.",
    expandedDescription:
      "Complete transaction history stored immutably on blockchain. Real-time tracking of deposit status, interest accrual, and fund movements. Public audit trails ensure accountability and build trust between all parties.",
    icon: "FaLink",
  },
  {
    title: "FAST DISPUTE RESOLUTION",
    description: "DAO resolves disputes fairly and efficiently.",
    expandedDescription:
      "Decentralized governance ensures fair and unbiased dispute resolution. Community-driven decisions with economic incentives for honest participation. Average resolution time of 48-72 hours with transparent voting mechanisms.",
    icon: "FaBalanceScale",
  },
];

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

const ScrollingTextRow = ({ texts, speed, className }) => {
  const contentRef = useRef(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(scrollY.get());
  const rafId = useRef(null);
  const currentSpeed = useRef(speed);
  const contentWidth = useRef(0);

  useEffect(() => {
    if (contentRef.current) {
      contentWidth.current = contentRef.current.scrollWidth / 2;
    }

    if (speed > 0) {
      x.set(-contentWidth.current);
    } else {
      x.set(0);
    }

    const animateLoop = () => {
      const scrollYNow = scrollY.get();
      const scrollDelta = scrollYNow - lastScrollY.current;
      lastScrollY.current = scrollYNow;

      if (Math.abs(scrollDelta) > 0.5) {
        currentSpeed.current = speed * 1.4;
      } else {
        currentSpeed.current = speed;
      }

      const newX = x.get() + currentSpeed.current;

      if (speed < 0) {
        if (newX < -contentWidth.current) {
          x.set(0);
        } else {
          x.set(newX);
        }
      } else {
        if (newX > 0) {
          x.set(-contentWidth.current);
        } else {
          x.set(newX);
        }
      }

      rafId.current = requestAnimationFrame(animateLoop);
    };

    rafId.current = requestAnimationFrame(animateLoop);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed, x, scrollY]);

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <div
          ref={contentRef}
          className={`flex text-white text-xl font-space-grotesk font-bold ${className}`}
        >
          {[...texts, ...texts].map((text, idx) => (
            <span key={`row-${idx}`} className="flex-shrink-0">
              {text}/
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Features() {
  return (
    <>
      <div className="bg-black flex flex-col ">
        <ScrollingTextRow
          texts={scrollingTexts}
          speed={-0.4}
          className="text-white text-xl font-bold"
        />
        <ScrollingTextRow
          texts={scrollingTexts.slice().reverse()}
          speed={0.4}
          className="text-white/80 text-xl font-bold"
        />
        <ScrollingTextRow
          texts={scrollingTexts.slice(4)}
          speed={-0.4}
          className="text-white/50 text-xl font-bold"
        />
        <ScrollingTextRow
          texts={scrollingTexts.slice(0, 4).reverse()}
          speed={0.4}
          className="text-white/20 text-sm "
        />
        <ScrollingTextRow
          texts={scrollingTexts}
          speed={-0.4}
          className="text-white/10 text-xl font-bold"
        />
      </div>

      {/* Features Section */}
      <section id="features" className="py-24  text-gray-300">
        <div className="max-w-7xl mx-auto px-6 ">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-brutalist-lg font-bold text-white tracking-wider mb-4"
              style={{ fontFamily: "Unbounded, sans-serif" }}
            >
              FEATURES
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => {
              const IconComponent = iconMap[feature.icon];
              return (
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
                  <motion.div
                    className="absolute left-6 transition-all duration-500 ease-in-out"
                    animate={{
                      bottom: "24px",
                      top: "auto",
                    }}
                    whileHover={{
                      bottom: "auto",
                      top: "24px",
                    }}
                  >
                    <IconComponent className="text-4xl text-gray-100 group-hover:text-white transition-colors duration-500" />
                  </motion.div>

                  {/* Title - top right, disappears on hover */}
                  <div className="absolute top-6 right-6 text-right transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4">
                    <h3 className="text-lg font-space-grotesk font-bold text-white leading-tight">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Content area */}
                  <div className="absolute inset-6 flex items-center justify-center">
                    {/* Default description - fades out on hover */}
                    <p className="text-gray-300 font-brutalist leading-relaxed text-base text-center transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4">
                      {feature.description}
                    </p>

                    {/* Expanded description - slides up on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                      <p className="text-white font-brutalist leading-relaxed text-sm text-center">
                        {feature.expandedDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-20 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => {
                const target = document.querySelector("#cta");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-12 py-4 bg-cta-primary/30 text-white font-brutalist font-bold text-lg tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET STARTED
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
