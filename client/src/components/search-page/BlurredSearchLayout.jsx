import { useState } from "react";
import { searchResults } from "src/utils/LinkData";
import { MoreSearchResultsIcon } from "src/assets/MoreSearchResultsIcon";
import { IoMdArrowDropdown } from "react-icons/io";

const BlurredSearchLayout = ({
  setShowPaymentDetails,
  setShowPaymentDetailsThree,
  setShowBlurredScreen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {/* Blurred search section */}
      <div className="bg-[#A7A7A7] opacity-55 border border-[#E8E8E8] w-[84.6875vw] max-w-[1084px] rounded-lg blur-sm">
        <div className="w-full opacity-55 px-5 pt-6 mb-6 sm:px-12 sm:pt-8 sm:mb-8 md:px-18 md:pt-10 md:mb-10">
          {/* Get access alert */}
          <section className="bg-[#A8A8A8] w-full rounded-md py-2 px-4 sm:rounded-lg sm:py-3 sm:px-6 md:py-4 md:rounded-xl md:px-8">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <p className="text-center font-extrabold text-[#000] text-xs leading-4 sm:text-base sm:leading-6 md:text-xl md:leading-8">
                Access full 5 searched info and related updates
              </p>

              <button className="bg-[#000] text-[#FFF] rounded-md w-20 h-6 text-xs mt-2 sm:w-24 sm:h-7 sm:text-sm md:w-28 md:h-9 md:text-base">
                Get access
              </button>
            </div>
          </section>

          {/* Search result section */}
          <section className="mt-2 md:mt-4">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#CBCBCB] pt-5 pb-6 px-2 sm:px-4 sm:pt-6 sm:pb-7 md:px-6 md:pt-7 md:pb-8"
              >
                <p className="font-black text-[#000] text-xs sm:text-base md:text-xl">
                  {item.title}
                </p>
                <div className="mt-3 sm:mt-4 md:mt-5 md:flex">
                  <p className="font-normal text-[#000] text-xs sm:text-base md:text-xl">
                    Name of owner: <span>{item.nameOfOwner}</span>
                  </p>
                  <p className="font-normal text-[#000] text-xs sm:text-base md:text-xl md:ml-14">
                    Survey plan number: <span>{item.surveyPlanNum}</span>
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* More results button */}
          <section className="mt-4 mb-4 px-2 sm:px-4 sm:mt-5 sm:mb-6 md:mt-6 md:mb-7 md:px-6">
            <button className="text-[#292E9F] text-xs sm:text-base md:text-xl">
              more results from searched info
              <span className="inline-block ml-1 sm:ml-2 md:ml-3">
                <MoreSearchResultsIcon />
              </span>
              <span className="inline-block">
                <MoreSearchResultsIcon />
              </span>
            </button>
          </section>
        </div>
      </div>

      {/* Payment alert section */}
      <div className="w-[84.6875vw] max-w-[1084px]">
        <div className="bg-[#423B3B] mt-7 px-3 py-3 rounded-md sm:mt-4 sm:px-4 sm:py-4 sm:rounded-lg md:mt-9 md:px-10 md:py-4 md:rounded-xl flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Alert text */}
          <div className="flex flex-col">
            <p className="text-[#FFF] font-black text-sm mb-2 sm:text-base sm:mb-3 md:text-lg md:mb-4">
              Please note:
            </p>
            <p className="text-[#FFF] font-medium text-xs sm:text-base md:text-lg">
              - Payment for Search only gives user access to the search result.
            </p>
            <p className="text-[#FFF] font-medium text-xs sm:text-base md:text-lg">
              - Payment for Search and Reports enables users to download
              official Lis Pendens Certificates.
            </p>
          </div>

          {/* Make payment button */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#EFEFEF] text-[#000] font-black text-xs rounded-md w-32 h-8 sm:text-sm sm:rounded-lg sm:w-36 sm:h-9 md:text-base md:rounded-xl md:w-40 md:h-10 flex items-center justify-center"
            >
              Make Payment
              <IoMdArrowDropdown className="ml-1 text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="bg-white w-40 shadow-md rounded-lg text-sm border border-[#213f7d0f] space-y-2 absolute z-[1] left-0 mt-2">
                  <div 
                    onClick={() => {
                      setShowBlurredScreen(false);
                      setShowPaymentDetails(true);
                    }}
                    className="block w-full py-1 pl-2 pr-2 text-[#000] font-black text-xs cursor-pointer hover:bg-slate-300">
                    Search
                  </div>
                  <div 
                    onClick={() => {
                      setShowBlurredScreen(false);
                      setShowPaymentDetailsThree(true); // Updated
                    }}
                    className="block w-full py-1 pl-2 pr-2 text-[#000] font-black text-xs cursor-pointer hover:bg-slate-300">
                    Search and Reports
                  </div>
              </div>
            )}
          </div>
        </div>

        {/* Let us know text */}
        <div className="mt-4 mb-10 sm:mt-5 sm:mb-14 md:mt-6 md:mb-16 flex justify-center sm:justify-end">
          <p className="font-extrabold text-[#000] text-xs sm:text-sm md:text-base">
            Problems with the Informations?{" "}
            <span className="underline">Let us Know</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlurredSearchLayout;
