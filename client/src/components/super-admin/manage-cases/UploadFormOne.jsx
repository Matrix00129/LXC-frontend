import { NigeriaStateLGAData } from "../../../utils/StateData";

const UploadFormOne = ({ register, errors, watch }) => {
  const stateList = (stateName) => {
    const stateResult = NigeriaStateLGAData.find(
      (state) => state.name == stateName
    );
    if (stateResult) {
      return stateResult.lgas;
    } else {
      return [];
    }
  };

  return (
    <>
      <section>
        <div className="bg-white md:grid md:grid-cols-2 md:gap-4  p-3 py-6 md:p-10">
          {/* ====Property Title ====== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">
              Property Title i.e. type of title to the property:
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
          {/* ==== Registered Title ====== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor=""> Name of Owner of Property:</label>
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

          {/* =========== Register Title ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Registered Title number:</label>
            <input
              type="text"
              name="registeredTitleNumber"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("registeredTitleNumber")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.registeredTitleNumber?.message}
            </p>
          </div>
          {/* ============Plot Number ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Plot Number</label>
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

          {/* ======State and Local Government Area ==== */}
          <div className="mb-4">
            <label className="block mb-2 text-md">State</label>
            <select
              name="state"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("state")}
            >
              {NigeriaStateLGAData.map((state, index) => (
                <option key={index} value={state?.name}>
                  {" "}
                  {state?.name}{" "}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-[0.75rem] text-right">
              {errors.state?.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-md">LGA</label>
            <select
              name="lga"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("lga")}
            >
              <option value="">-Select LGA-</option>
              {stateList(watch("state")).map((lga, index) => (
                <option key={index} value={lga.name}>
                  {" "}
                  {lga.name}{" "}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-[0.75rem] text-right">
              {errors.lga?.message}
            </p>
          </div>

          {/* ============City Name ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="" className="text-md">City Name</label>
            <input
              type="text"
              name="city"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("city")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.city?.message}
            </p>
          </div>

          {/* ============Street Name ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Street Name</label>
            <input
              type="text"
              name="plotStreetName"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("plotStreetName")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.plotStreetName?.message}
            </p>
          </div>

          {/* ============Registered Survey Plan ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Registered Survey plan number:</label>
            <input
              type="text"
              name="surveyPlanNumber"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("surveyPlanNumber")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.surveyPlanNumber?.message}
            </p>
          </div>

          {/* ============Suit/Claim Parties ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Name of parties to the Suit/Claim:</label>
            <input
              type="text"
              name="nameParties"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("nameParties")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.nameParties?.message}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadFormOne;
