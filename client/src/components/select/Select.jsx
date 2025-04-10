import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export const Select = ({
  onSelect,
  register,
  name,
  inputData,
  getSelectedSector,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(!!inputData?.length);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside the select component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    if (item.name.toLowerCase() !== selected.toLowerCase()) {
      setSelected(item.name);
      setOpen(false);
      setInputValue("");
      onSelect ? onSelect(item) : null;
    }
  };

  return (
    <div className="text-sm space-y-3">
      <div
        ref={dropdownRef}
        className="font-medium relative mt-4 border-[1.2px] border-slate-300 rounded-lg cursor-pointer"
      >
        <div
          onClick={() => !disabled && setOpen(!open)}
          className={`bg-white mt-1 pt-1 w-full  px-2 pb-3 rounded-lg flex items-center justify-between input-default ${
            !selected && "text-gray-700"
          }`}
        >
          <input
            type="text"
            value={
              selected
                ? selected.length > 25
                  ? selected.substring(0, 25) + "..."
                  : selected
                : getSelectedSector
                ? getSelectedSector
                : ""
            }
            name={name}
            {...register}
            placeholder="Select an option"
            className="w-full text-[#10172A] focus:outline-none bg-white"
            readOnly
          />
          <RiArrowDownSLine
            size={24}
            className={` text-[#10172A] font-extrabold ${open && "rotate-180"}`}
          />
        </div>

        <ul
          className={`shadow-md shadow-gray-400 bg-white mt-2 overflow-y-auto w-full font-normal cursor-pointer ${
            open ? "max-h-36" : "max-h-0"
          } absolute top-full w-full z-50`}
        >
          {isDataAvailable ? (
            inputData?.map((item, index) => (
              <li
                key={index}
                className={`p-4 text-sm hover:hover:bg-gray-200 cursor-pointer hover:text-black
              ${item?.name?.toLowerCase() === selected?.toLowerCase() && ""}
              ${
                item?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
                onClick={() => handleSelect(item)}
              >
                {item?.name}
              </li>
            ))
          ) : (
            <li className="p-4 text-sm text-gray-500 cursor-not-allowed">
              No data available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};