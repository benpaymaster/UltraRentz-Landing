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

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };
    loadBlogs();
  }, []);

  return (
    <section id="blog" className="py-24">
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
            BLOG
          </h2>
          <div className="w-16 h-1 bg-cta-primary mx-auto mb-6"></div>
          <p className="text-xl text-text-primary font-brutalist max-w-2xl mx-auto leading-relaxed">
            Latest news and insights from the UltraRentz team
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogs.map((post, idx) => (
            <motion.article
              key={idx}
              className="group bg-[#201E1F] hover:bg-black border-2 border-gray-300 hover:border-gray-600 transition-all duration-500 relative overflow-hidden h-96 cursor-pointer"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "8px 8px 0px rgba(255,255,255,1)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="h-1  group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-container-bg text-white text-xs font-brutalist font-bold tracking-wider">
                      {post.category.toUpperCase()}
                    </span>
                    <span className="text-gray-500 text-sm font-brutalist">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-brutalist font-bold text-white mb-4 leading-tight group-hover:text-cta-primary transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 font-brutalist leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-400 font-brutalist">
                      By {post.author}
                    </span>
                    <span className="text-sm text-gray-500 font-brutalist">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 ">
                    {post.tags.slice(0, 2).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-1 bg-cta-primary text-white text-xs font-space-grotesk font-bold tracking-wide"
                      >
                        #{tag.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    className="w-full py-3 bg-white text-cta-primary font-brutalist font-bold tracking-wide border-2 border-white hover:bg-cta-primary hover:text-white hover:border-cta-primary transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    READ MORE →
                  </motion.button>
                </div>
              </div>
            </motion.article>
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
            VIEW ALL POSTS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
