import { statusDisputeData } from "../../../utils/LinkData";
import { Select } from "../../select/Select";

const EditUploadFormTwo = ({
  register,
  errors,
  getStatusDisputeName,
  setGetStatusDisputeName,
  setValue,
  caseData,
}) => {
  return (
    <>
      <section>
        <div className="bg-white md:grid md:grid-cols-2 md:gap-4  p-3 py-6 md:p-10">
          {/* ===========Suit Number =========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Suit Number:</label>
            <input
              type="text"
              name="suitNumber"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("suitNumber")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.suitNumber?.message}
            </p>
          </div>
          {/* ================ Nature of dispute: ============= */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor=""> Nature of dispute:</label>
            <input
              type="text"
              name="natureDispute"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("natureDispute")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.natureDispute?.message}
            </p>
          </div>

          {/* =========== Court Division ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">
              The Court and judicial Division of the action:
            </label>
            <input
              type="text"
              name="courtDivision"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("courtDivision")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.courtDivision?.message}
            </p>
          </div>

          {/* ============ Status of dispute: ============= */}

          <div className="max-w-[400px] mb-4">
            <label htmlFor=""> Status of dispute:</label>
            <Select
              focusContent=""
              placeholder="search"
              onSelect={(item) => {
                setGetStatusDisputeName(item?.name);
                setValue("statusDispute", item?.name);
              }}
              inputData={statusDisputeData}
              getSelectedSector={caseData?.statusDispute}
              selectOption=""
              register={{ ...register("statusDispute") }}
            />
            {!getStatusDisputeName && (
              <p className="text-red-500 text-[0.75rem]">
                {errors?.statusDispute?.message}
              </p>
            )}
          </div>

          {/* ============Date of Commencement: ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">Date of Commencement of Claim/dispute:</label>
            <input
              type="text"
              name="dateCommencement"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("dateCommencement")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.dateCommencement?.message}
            </p>
          </div>

          {/* ============If ‘Disposed’ date of disposal: ========== */}
          <div className="max-w-[400px] mb-4">
            <label htmlFor="">If Disposed date of disposal:</label>
            <input
              type="text"
              name="disposed"
              className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
              {...register("disposed")}
            />
            <p className="text-red-500 text-[0.75rem]">
              {errors.disposed?.message}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUploadFormTwo;
