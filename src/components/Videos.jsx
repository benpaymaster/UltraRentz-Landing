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

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/data/videos.json");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos:", error);
      }
    };
    loadVideos();
  }, []);

  return (
    <section id="videos" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-brutalist-lg font-bold text-gray-200 tracking-wider mb-4"
            style={{ fontFamily: "Unbounded, sans-serif" }}
          >
            VIDEOS
          </h2>
          <div className="w-24 h-1 bg-cta-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 font-brutalist max-w-2xl mx-auto leading-relaxed">
            Watch our latest demos and tutorials
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              className="group bg-background-primary border-2 border-container-bg/30 hover:border-cta-primary transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-container-bg/20 to-cta-primary/20 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-background-primary"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-container-bg text-white text-xs font-brutalist font-bold tracking-wider">
                    {video.videoType.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-brutalist font-bold">
                    {video.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-cta-primary text-white text-xs font-brutalist font-bold tracking-wide">
                    {video.category.toUpperCase()}
                  </span>
                  <span className="text-gray-500 text-sm font-brutalist">
                    {new Date(video.videoDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-brutalist font-bold text-text-primary mb-3 leading-tight">
                  {video.videoTitle}
                </h3>

                <p className="text-gray-700 font-brutalist text-sm leading-relaxed mb-4">
                  {video.videoDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-space-grotesk font-bold tracking-wide"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="w-full py-3 bg-container-bg text-white font-brutalist font-bold tracking-wide hover:bg-opacity-90 transition-all duration-200 border-2 border-container-bg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  WATCH NOW
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
            VIEW ALL VIDEOS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
