"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HousePlug } from "lucide-react";

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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
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
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-slate-700 rounded-full bg-white/10 backdrop-blur-md saturate-150 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-9 py-5  items-center justify-center space-x-1 md:space-x-8",
          className
        )}
      >
        <Link href="/" className="flex items-center space-x-1 group">
          <HousePlug className="w-7 h-7 text-white group-hover:text-blue-400" />
          <p className="text-lg font-bold text-white group-hover:text-blue-400">UltraRentz</p>
        </Link>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            data-umami-event={navItem.name}
            key={`link=${idx}`}
            href={navItem.link}
            target={navItem.target}
            className={cn(
              "relativetext-neutral-50 items-center flex space-x-1 font-semibold dark:hover:text-neutral-300 hover:text-blue-400 text-white"
            )}
          >
            <span className="hidden sm:block text-md">{navItem.name}</span>
          </Link>
        ))}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
