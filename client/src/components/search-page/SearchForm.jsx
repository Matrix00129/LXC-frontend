import { NigeriaStateLGAData } from "src/utils/StateData";

const SearchForm = ({ register, errors, watch, isSearching }) => {
  const stateList = (stateName) => {
    const stateResult = NigeriaStateLGAData.find(
      (state) => state.name == stateName
    );
    if (stateResult) {
      return stateResult.lgas;
    } else {
      return [];
    }
  }
  
  return (
    <>
      <div className="bg-white px-6 py-4 max-w-[480px] rounded-2xl shadow-2xl mb-2 md:mt-4 md:mb-8 lg:px-8 max-h-[80vh] overflow-y-scroll">
        <p className="text-lg md:text-xl font-semibold mb-4">
          Fill the search form
        </p>

        <div className="space-y-4">
          <div className="mt-4">
            <label className="text-xs md:text-sm">
              Type of Title (eg. certificate of occupancy):
            </label>
            <input
              type="text"
              name="propertyTitle"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("propertyTitle")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.propertyTitle?.message}
            </p>
          </div>

          <div className="mt-4">
            <label className="text-xs md:text-sm">
              Registered Title Number
            </label>
            <input
              type="text"
              name="registerTitle"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("registerTitle")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.registerTitle?.message}
            </p>
          </div>

          {/* ====== Location (plot number) ====== */}
          <div className="mt-4">
            <label className="text-xs md:text-sm">
              Plot Number
            </label>
            <input
              type="text"
              name="plotNumber"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("plotNumber")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.plotNumber?.message}
            </p>
          </div>

          {/* ====== Location (street name) ====== */}
          <div className="mt-4">
            <label className="text-xs md:text-sm">
              Street Name
            </label>
            <input
              type="text"
              name="plotStreetName"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("plotStreetName")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.plotStreetName?.message}
            </p>
          </div>

              {/* ====== City (Town) ====== */}
              <div className="mt-4">
            <label className="text-xs md:text-sm">
              City/Town
            </label>
            <input
              type="text"
              name="city"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("city")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.city?.message}
            </p>
          </div>

          {/* ====== Location (State and LGA) ====== */}
          <div className="mt-4">
            <label className="text-xs md:text-sm">
              State
            </label>
            <select
              name="state"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("state")}
            >
              {NigeriaStateLGAData.map((state, index) => (
                <option 
                  key={index}
                  value={state?.name}  
                >
                  {" "}
                  {state?.name}{" "}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-[0.75rem]">
              {errors.state?.message}
            </p>
          </div>

          <div className="mt-4">
            <label className="text-xs md:text-sm">
              LGA
            </label>
            <select
              name="lga"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("lga")}
            >
              <option value="">
                -Select LGA-
              </option>
              {stateList(watch("state")).map((lga, index) => (
                <option key={index} value={lga.name}>
                  {" "}
                  {lga.name}{" "}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-[0.75rem]">
              {errors.lga?.message}
            </p>
          </div>

          <div className="mt-4">
            <label className="text-xs md:text-sm">Survey Plan Number</label>
            <input
              type="text"
              name="surveyPlanNumber"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("surveyPlanNumber")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.surveyPlanNumber?.message}
            </p>
          </div>

          <div className="mt-4">
            <label className="text-xs md:text-sm">
              Name of Owner of Property (Optional)
            </label>
            <input
              type="text"
              name="propertyOwner"
              className="block h-[1.9rem] max-w-[480px] w-full px-2 py-1 border border-solid border-[#BFBFBF] rounded-[0.3rem] mt-3"
              {...register("propertyOwner")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.propertyOwner?.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            disabled={isSearching}
            className="bg-[#000] text-[#FFF] shadow-xl font-semibold text-[0.85rem] px-2 py-2 rounded-[0.45rem] sm:text-[1.05rem] sm:px-[2rem] sm:py-[0.5rem] md:text-[1.15rem] md:px-[2rem] md:py-[0.625rem] md:rounded-[0.65rem] lg:px-[2rem] lg:py-[0.35rem] lg:rounded-[0.75rem]  transition duration-700 ease-in-out hover:bg-white hover:text-[#000000] hover:border-[#000000] border-[1.3px]"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
