import { motion } from "framer-motion";

const SearchButton = () => {
  return (
    <motion.button
      className="relative radial-gradient text-[#FFFFFF] text-[0.7rem] w-[8rem] h-[1.75rem] rounded-[0.55rem] font-semibold sm:w-[11.875rem] sm:h-[2.4rem] sm:rounded-[0.7rem] sm:text-[1rem] md:w-[14.875rem] md:h-[2.875rem] md:rounded-[1rem] md:text-[1.25rem]"
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whiteTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        }
      }}
    >
      <span
        className="relative tracking-wide h-full w-full flex items-center justify-center rounded-[0.55rem] sm:rounded-[0.7rem] md:rounded-[1rem] linear-mask"
      >
        Search property
      </span>
      <span
        className="block absolute inset-0 rounded-[0.55rem] sm:rounded-[0.7rem] md:rounded-[1rem] p-[2px] linear-overlay"
      />
    </motion.button>
  );
}

export default SearchButton;