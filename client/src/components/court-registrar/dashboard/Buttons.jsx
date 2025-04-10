import { FaPlus } from "react-icons/fa";
import { SearchIcon } from "../../../assets/SearchIcon";

const Buttons = ({ setShowUploadCaseForm, setSearchFilter }) => {
  return (
    <div className="flex justify-between space-x-3 items-center py-[1.1rem] md:py-[1.3rem] lg:py-[1.56rem]">
      {/* ====== Search Case Record Button ====== */}

      <div className="relative p-2  bg-white rounded-xl cursor-pointer w-1/2 lg:w-fit">
        <span className="absolute left-4 bottom-3 cursor-pointer">
          <SearchIcon />
        </span>
        <input
          type="text"
          name="searchCases"
          placeholder="search cases"
          className="outline-none focus:out-none ml-4 pl-4 w-1/2"
          onChange={(event) => setSearchFilter(event.target.value)}
        />
      </div>

      {/* ====== Upload New Button ====== */}

      <button
        className="flex items-center justify-center bg-[#524A4C] border border-solid border-[#929292] text-[0.6rem] rounded-lg font-black text-[#FFF] stroke-2 w-1/2 h-[1.9rem] md:text-[0.775rem] md:w-[8.675rem] md:h-[2.18rem] lg:text-[0.8125rem] lg:w-[8.875rem] lg:h-[2.25rem]"
        onClick={() => setShowUploadCaseForm(true)}
      >
        <FaPlus className="h-[0.5rem] w-[0.5rem] inline-block mr-[0.38rem] stroke-2" />
        {"Upload new"}
      </button>
    </div>
  );
};

export default Buttons;
