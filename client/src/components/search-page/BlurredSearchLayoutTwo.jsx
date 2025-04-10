import { searchResults } from "src/utils/LinkData";
import { MoreSearchResultsIcon } from "src/assets/MoreSearchResultsIcon";

const BlurredSearchLayoutTwo = ({
  setShowBlurredScreenTwo,
  setShowPaymentDetailsTwo,
}) => {
  return (
    <div>
      {/* ====== Blurred search section ====== */}
      <div>
        <div className="bg-[#A7A7A7] opacity-[0.55] border border-[#E8E8E8] w-[84.6875vw] max-w-[1084px] rounded-[0.5rem] sm:rounded-[0.7rem] md:rounded-[0.875rem] blur-sm">
          <div className="w-full opacity-[0.55] px-[1.3rem] pt-[1.6rem] mb-6 sm:px-[3rem] sm:pt-[2rem] sm:mb-[1.9rem] md:px-[4.5rem] md:pt-[2.438rem] md:mb-[2.375rem]">
            {/* ====== Get access alert ====== */}
            <section className="bg-[#A8A8A8] w-full rounded-[0.35rem] py-[0.5rem] px-[1rem] sm:rounded-[0.5rem] sm:py-[0.7rem] sm:px-[1.3rem] md:py-[0.875rem] md:rounded-[0.688rem] md:px-[1.625rem]">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <p className="text-center font-extrabold text-[#000000] text-[0.8rem] leading-[1rem]* sm:text-[1rem] sm:leading-[1.4rem]* md:text-[1.25rem] md:leading-[1.875rem]*">
                  Access full 5 searched info and related updates
                </p>

                {/* ====== Get access button ====== */}
                <button className="bg-[#000000] text-[#FFFFFF] rounded-[0.4rem] w-[4.7rem] h-[1.5rem] text-[0.6rem] mt-[0.5rem] sm:rounded-[0.5rem] sm:w-[6rem] sm:h-[1.8rem] sm:text-[0.7rem] sm:mt-[0rem] md:rounded-[0.625rem] md:w-[7.313rem] md:h-[2.188rem] md:text-[0.875rem] md:mt-[0rem]">
                  Get access
                </button>
              </div>
            </section>

            {/* ====== Search result section ====== */}
            <section className=" md:mt-[0.5rem]">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-b-[#CBCBCB] pt-[1.3rem] pb-[1.5rem] px-[0.5rem] sm:px-[1rem] sm:pt-[1.5rem] sm:pb-[1.7rem] md:px-[1.625rem] md:pt-[1.75rem] md:pb-[2.125rem]"
                >
                  <p className="font-black text-[#000] text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                    {item.title}
                  </p>
                  <div className="mt-[0.75rem] sm:mt-[0.9rem] md:mt-[1.125rem] md:flex">
                    <p className="font-normal text-[#000] text-[0.75rem] sm:text-[0.9rem] md:text-[1.125rem]">
                      Name of owner: <span>{item.nameOfOwner}</span>
                    </p>
                    <p className="font-normal text-[#000] text-[0.75rem] sm:text-[0.9rem] md:text-[1.125rem] md:ml-[3.438rem]">
                      Survey plan number: <span>{item.surveyPlanNum}</span>
                    </p>
                  </div>
                </div>
              ))}
            </section>

            {/* ====== More results button ====== */}
            <section className="mt-[1rem] mb-[1.1rem] px-[0.5rem] sm:px-[1rem] sm:mt-[1.3rem] sm:mb-[1.5rem] md:mt-[1.5rem] md:mb-[1.7rem] md:px-[1.625rem]">
              <button className="text-[#292E9F] text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                more results from searched info
                <span className="inline-block ml-[0.3rem] sm:ml-[0.5rem] md:ml-[0.75rem]">
                  <MoreSearchResultsIcon />
                </span>
                <span className="inline-block">
                  <MoreSearchResultsIcon />
                </span>
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* ====== Payment alert section ====== */}
      <div className="w-[84.6875vw] max-w-[1084px]">
        <div className="bg-[#423B3B] mt-[1.7rem] px-[1.5rem] py-[0.7rem] rounded-[0.45rem] sm:mt-[2rem] sm:px-[2.5rem] sm:py-[1.1rem] sm:rounded-[0.65rem] md:mt-[2.313rem] md:px-[3.375rem] md:py-[1.563rem] md:rounded-[0.875rem] flex flex-col md:flex-row md:justify-between md:items-center">
          {/* ====== Alert text ====== */}
          <div className="flex flex-col">
            <p className="text-[#FFF] font-black text-[0.85rem] mb-[0.85rem] sm:text-[0.95rem] sm:mb-[0.95rem] md:text-[1.063rem] md:mb-[1.125rem]">
              Please note:
            </p>
            <p className="text-[#FFF] font-medium text-[0.75rem] sm:text-[0.85rem] md:text-[0.938rem]">
              - Payment for Search only gives user access to the search result.
            </p>
            <p className="text-[#FFF] font-medium text-[0.75rem] sm:text-[0.85rem] md:text-[0.938rem]">
              - Payment for Search and Reports enables users to download official Lis Pendens Certificates.
            </p>
          </div>

          {/* ====== Make payment button ====== */}
          <div
            onClick={() => {
              setShowBlurredScreenTwo(false), setShowPaymentDetailsTwo(true);
            }}
          >
            <div className="flex justify-center mt-[1rem] md:mt-[0rem] md:ml-[3rem]">
              <button className="bg-[#EFEFEF] text-[#000000] font-black text-[0.65rem] rounded-[0.3rem] w-[7.5rem] h-[2.1rem] sm:text-[0.7rem] sm:rounded-[0.4rem] sm:w-[9rem] sm:h-[2.3rem] md:text-[0.75rem] md:rounded-[0.5rem] md:w-[10.375rem] md:h-[2.563rem]">
                Make Payment
              </button>
            </div>
          </div>
        </div>

        {/* ====== let us know text ====== */}
        <div className="mt-[0.9rem] mb-[2.5rem] sm:mt-[1.1rem] sm:mb-[3.5rem] md:mt-[1.375rem] md:mb-[4.313rem] flex justify-center sm:justify-end">
          <p className="font-extrabold text-[#000] text-[0.65rem] sm:text-[0.75rem] md:text-[0.875rem]">
            Problems with the Informations?{" "}
            <span className="underline">Let us Know</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlurredSearchLayoutTwo;
