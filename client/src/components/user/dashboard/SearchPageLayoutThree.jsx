import { MoreSearchResultsIcon } from "src/assets/MoreSearchResultsIcon";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchPageLayoutThree = ({
  showSearchResultData,
  setShowSearchResultThree,
  setShowCaseInformationThree,
  setSelectedCaseData,
  selectedCaseData,
}) => {
  const [clickedItemId, setClickedItemId] = useState(null);

  const handleClick = (item) => {
    setClickedItemId(item._id);
    setSelectedCaseData(item);
  };

  return (
    <>
      <section>
        {/* ========Search Result Info. goes here ===== */}
        <div className="w-full bg-[#FFFFFF] border border-[#E8E8E8] px-[1.3rem] pt-[1.6rem] rounded-[1rem] mb-6 sm:px-[3rem] sm:pt-[2rem] sm:rounded-[1.3rem] sm:mb-[1.9rem] md:px-[4.5rem] md:pt-[2.438rem] md:rounded-[1.5rem] md:mb-[2.375rem]">
          {/* ====== Get access alert ====== */}
          <section className="bg-[#A8A8A8] w-full rounded-[0.35rem] py-[0.5rem] px-[1rem] sm:rounded-[0.5rem] sm:py-[0.7rem] sm:px-[1.3rem] md:py-[0.875rem] md:rounded-[0.688rem] md:px-[1.625rem]">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              {/* <p className="text-center font-extrabold text-[#000000] text-[0.8rem] leading-[1rem]* sm:text-[1rem] sm:leading-[1.4rem]* md:text-[1.25rem] md:leading-[1.875rem]*">
                Access full {showSearchResultData?.data?.cases?.length} searched
                info and related updates
              </p> */}
              <p className="text-center font-extrabold text-[#000000] text-[0.8rem] leading-[1rem]* sm:text-[1rem] sm:leading-[1.4rem]* md:text-[1.25rem] md:leading-[1.875rem]*">
                Access all 136 search results
              </p>
              {/* ====== Get access button ====== */}
              <button
                onClick={() => {
                  if (selectedCaseData === null) {
                    toast.error("Please Select a Case");
                  } else {
                    setShowCaseInformationThree(true);
                    setShowSearchResultThree(false);
                  }
                }}
                className="bg-[#000000] text-[#FFFFFF] rounded-[0.4rem] w-[4.7rem] h-[1.5rem] text-[0.6rem] mt-[0.5rem] sm:rounded-[0.5rem] sm:w-[6rem] sm:h-[1.8rem] sm:text-[0.7rem] sm:mt-[0rem] md:rounded-[0.625rem] md:w-[7.313rem] md:h-[2.188rem] md:text-[0.875rem] md:mt-[0rem]"
              >
                Get access
              </button>
            </div>
          </section>

          {/* ====== Search result section ====== */}
          <section className="md:mt-[1.5rem]">
            {showSearchResultData?.data?.cases?.map((item) => (
              <div
                key={item._id}
                onClick={() => handleClick(item)}
                className={`border-b border-b-[#CBCBCB] pt-[1.3rem] pb-[1.5rem] px-[0.5rem] sm:px-[1rem] sm:pt-[1.5rem] sm:pb-[1.7rem] md:px-[1.625rem] md:pt-[1.75rem] md:pb-[2.125rem] ${
                  clickedItemId === item._id ? "bg-[#A8A8A8]" : ""
                }`}
              >
                <p className="font-black text-[#000] text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                  {item.propertyTitle}
                </p>
                <div className="mt-[0.75rem] sm:mt-[0.9rem] md:mt-[1.125rem] md:flex">
                  <p className="font-normal text-[#000] text-[0.75rem] sm:text-[0.9rem] md:text-[1.125rem]">
                    Name of owner: <span>{item.propertyOwner}</span>
                  </p>
                  <p className="font-normal text-[#000] text-[0.75rem] sm:text-[0.9rem] md:text-[1.125rem] md:ml-[3.438rem]">
                    Survey plan number: <span>{item.surveyPlanNumber}</span>
                  </p>
                </div>
                {/* Displaying matchedCriteria */}
                <div className="mt-[0.75rem] sm:mt-[0.9rem] md:mt-[1.125rem]">
                  {Object.entries(item.matchedCriteria).map(([key, value]) => (
                    <p
                      key={key}
                      className="font-normal text-[#292E9F] text-[0.75rem] sm:text-[0.9rem] md:text-[1.125rem]"
                    >
                      Matched Criteria: {key}: <span>{value}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* ====== More results button ====== */}
          <section className="mt-[1.7rem] mb-[1.8rem] px-[0.5rem] sm:px-[1rem] sm:mt-[2rem] sm:mb-[2.2rem] md:mt-[2.375rem] md:mb-[2.688rem] md:px-[1.625rem]">
            <Link to="/payment-details">
              <button className="text-[#292E9F] text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                more results from searched info
                <span className="inline-block ml-[0.3rem] sm:ml-[0.5rem] md:ml-[0.75rem]">
                  <MoreSearchResultsIcon />
                </span>
                <span className="inline-block">
                  <MoreSearchResultsIcon />
                </span>
              </button>
            </Link>
          </section>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default SearchPageLayoutThree;
