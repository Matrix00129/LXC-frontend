const Button = ({ children, style }) => {
  return (
      <button style={style} className="bg-[#000] text-[#FFFFFF] text-[0.7rem] w-[8rem] h-[1.75rem] rounded-[0.55rem] font-semibold sm:w-[11.875rem] sm:h-[2.4rem] sm:rounded-[0.7rem] sm:text-[1rem] md:w-[14.875rem] md:h-[2.875rem] md:rounded-[1rem] md:text-[1.25rem]">
          {children}
      </button>
  );
}
export default Button
