import { GrFormClose } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NigeriaStateLGAData } from "src/utils/StateData";

const PropertyInformation = ({
  setShowPropertyInformation,
  register,
  errors,
  watch,
  isSearching,
}) => {
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
      <section className="mt-10  border-[1.2px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        {/* ========== Headings and Close Button ========== */}
        <p className="font-semibold text-[20px] bg-[#524A4C]  text-white p-3 md:px-10 rounded-t-2xl flex justify-between">
          Property Information
          <span
            className="cursor-pointer  font-bold"
            onClick={() => setShowPropertyInformation(false)}
          >
            <GrFormClose size={30} />
          </span>
        </p>
        <section>
          <div className="bg-white md:grid md:grid-cols-2 md:gap-4  p-3 py-6 md:p-10">
            {/* ====Property Title ====== */}
            <div className="max-w-[400px] mb-4">
              <label htmlFor="" className="font-semibold">
              Type of Title (eg certificate of occupancy): {/* Property Title (certificate of occupancy): */}
              </label>
              <input
                type="text"
                name="propertyTitle"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("propertyTitle")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.propertyTitle?.message}
              </p>
            </div>
            {/* ============== Registered Title  ============ */}
            <div className="max-w-[400px] mb-4">
              <label htmlFor="" className="font-semibold">
                Registered Title Number:
              </label>
              <input
                type="text"
                name="registerTitle"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("registerTitle")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.registerTitle?.message}
              </p>
            </div>

            {/* =========== Location/Address of Property: ==========
            <div className="max-w-[400px] mb-4">
              <label htmlFor="" className="font-semibold">
                Location/Address of Property:
              </label>
              <input
                type="text"
                name="propertyLocation"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("propertyLocation")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.propertyLocation?.message}
              </p>
            </div> */}

            {/* ====== Location (plot number) ====== */}
            <div className="max-w-[400px] mb-4">
              <label className="font-semibold">
                Plot Number
              </label>
              <input
                type="text"
                name="plotNumber"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"              
                {...register("plotNumber")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.plotNumber?.message}
              </p>
            </div>

            {/* ====== Location (street name) ====== */}
            <div className="max-w-[400px] mb-4">
              <label className="font-semibold">
                Street Name
              </label>
              <input
                type="text"
                name="streetName"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("streetName")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.streetName?.message}
              </p>
            </div>

            {/* ====== Location (State and LGA) ====== */}
            <div className="max-w-[400px] mb-4">
              <label className="font-semibold">
                State
              </label>
              <select
                name="state"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
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

            <div className="max-w-[400px] mb-4">
              <label className="font-semibold">
                LGA
              </label>
              <select
                name="lga"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
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

            {/* ============  Survey plan number: ============= */}
            <div className="max-w-[400px] mb-4">
              <label htmlFor="" className="font-semibold">
                Survey plan number:
              </label>
              <input
                type="text"
                name="survey"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("surveyPlanNumber")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.surveyPlanNumber?.message}
              </p>
            </div>

            {/* ============ Name of Owner of property ========== */}
            <div className="max-w-[400px] mb-4">
              <label htmlFor="" className="font-semibold">
                Name of Owner of property (optional):
              </label>
              <input
                type="text"
                name="propertyOwner"
                className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                {...register("propertyOwner")}
              />
              <p className="text-red-500 text-[0.75rem]">
                {errors.propertyOwner?.message}
              </p>
            </div>
          </div>
        </section>

        {/* =========Buttons   (Back Button and Search button) ======== */}
        <div className="flex gap-10 justify-end mt-1 border-t-[1.3px] rounded-b-2xl bg-gray-100 border-slate-200 px-4 md:pr-10 pt-4 pb-4">
          <>
            <div
              onClick={() => setShowPropertyInformation(false)}
              className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
            >
              Back
            </div>
            <button
              disabled={isSearching}
              className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default PropertyInformation;
