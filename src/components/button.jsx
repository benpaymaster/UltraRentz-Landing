import { useEffect, useRef, useState } from "react";

const AnimatedButton = ({
  defaultText = "",
  hoverText = "",
  className = "",
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState(defaultText);

  // Use useRef to hold the mutable interval ID
  const intervalRef = useRef(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    // This is the main effect that handles the transition logic
    if (isHovered && !isTransitioning) {
      // Start the hover-in transition
      setIsTransitioning(true);
      let iteration = 0;

      // Clear any previous interval to prevent conflicts
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayText(() => {
          return hoverText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return hoverText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        if (iteration >= hoverText.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTransitioning(false);
        }

        iteration += 1 / 3;
      }, 30);
    } else if (!isHovered && !isTransitioning) {
      // Start the hover-out transition
      setIsTransitioning(true);
      let iteration = 0;

      // Clear any previous interval to prevent conflicts
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayText(() => {
          return defaultText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return defaultText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        if (iteration >= defaultText.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTransitioning(false);
        }

        iteration += 1 / 3;
      }, 30);
    }

    // Cleanup function: always clear the interval on unmount or re-render
    return () => clearInterval(intervalRef.current);
  }, [isHovered, defaultText, hoverText]);

  // Use a separate useEffect to handle the final text state
  useEffect(() => {
    if (!isHovered && !isTransitioning) {
      setDisplayText(defaultText);
    }
  }, [defaultText, isHovered, isTransitioning]);

  const handleMouseEnter = () => {
    // Only allow hover-in if no transition is in progress
    if (!isTransitioning) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // Only allow hover-out if no transition is in progress
    if (!isTransitioning) {
      setIsHovered(false);
    }
  };

  return (
    <button
      className={`
        relative px-8 py-4 text-xl font-bold tracking-wider
        text-white bg-transparent
        transition-all duration-300 ease-in-out
        ${isHovered ? "border-l-2 border-r-2 border-cta-primary rounded-l-lg rounded-r-lg" : ""}
        ${className}
      `}
      style={{ fontFamily: "Unbounded, sans-serif" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{displayText}</span>

      <div
        className={`
          absolute left-0 top-0 w-0.5 h-full bg-cta-primary rounded-l-lg
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      />
      <div
        className={`
          absolute right-0 top-0 w-0.5 h-full bg-cta-primary rounded-r-lg
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      />
    </button>
  );
};

export default AnimatedButton;
