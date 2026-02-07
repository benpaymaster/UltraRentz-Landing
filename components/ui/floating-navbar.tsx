"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HousePlug, Menu, X } from "lucide-react";

interface NavProps {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    target?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
}

export const FloatingNav = ({
  navItems,
  className,
  children,
}: NavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          if (!drawerOpen) setVisible(false);
        }
      }
    }
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex fixed top-8 inset-x-0 mx-auto border border-slate-700 rounded-full bg-white/10 backdrop-blur-md saturate-150 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-5 md:px-9 py-4 md:py-5 items-center justify-between md:justify-center md:max-w-fit md:space-x-8 max-w-[calc(100%-2rem)]",
            className
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <HousePlug className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-blue-400" />
            <p className="text-base md:text-lg font-bold text-white group-hover:text-blue-400">UltraRentz</p>
          </Link>

          {/* Desktop Nav Items */}
          {navItems.map((navItem: any, idx: number) => (
            <Link
              data-umami-event={navItem.name}
              key={`link=${idx}`}
              href={navItem.link}
              target={navItem.target}
              className={cn(
                "relative text-neutral-50 items-center hidden md:flex space-x-1 font-semibold hover:text-blue-400 text-white"
              )}
            >
              <span className="text-md">{navItem.name}</span>
            </Link>
          ))}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {children}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5001] md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#0d0f1e] border-l border-gray-800 z-[5002] md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
                <Link
                  href="/"
                  className="flex items-center space-x-1.5 group"
                  onClick={() => setDrawerOpen(false)}
                >
                  <HousePlug className="w-6 h-6 text-blue-400" />
                  <span className="text-base font-bold text-white">UltraRentz</span>
                </Link>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <nav className="flex-1 overflow-y-auto py-4">
                {navItems.map((navItem, idx) => (
                  <motion.div
                    key={`drawer-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      data-umami-event={navItem.name}
                      href={navItem.link}
                      target={navItem.target}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 transition"
                    >
                      {navItem.icon && (
                        <span className="w-5 h-5 flex items-center justify-center text-gray-400">
                          {navItem.icon}
                        </span>
                      )}
                      <span className="font-medium text-sm">{navItem.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="px-5 py-4 border-t border-gray-800">
                <Link
                  href="#pilot-signup"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition"
                >
                  Join the Pilot
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
