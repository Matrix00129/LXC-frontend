import EditUploadFormTwo from "./EditUploadFormTwo";
import UploadFormOne from "./UploadFormOne";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { EditCaseRequest } from "../../../Services/CourtRegistrarRequest/cases.request";

const schema = yup.object().shape({
  propertyTitle: yup.string().required("Property Title is required"),
  propertyOwner: yup.string().required("Property Owner is required"),
  registerTitle: yup.string().required("Register Title is required"),
  state: yup.string().required("Property Location is required"),
  surveyPlanNumber: yup.string(),
  nameParties: yup.string().required("Name Parties is required"),
  suitNumber: yup.string().required("Suit Number is required"),
  natureDispute: yup.string().required("Nature Dispute is required"),
  courtDivision: yup.string().required("Court Division is required"),
  statusDispute: yup.string().required("Status Dispute is required"),
  dateCommencement: yup.string().required("Date Commencement is required"),
  disposed: yup.string(),
});

const EditCase = ({
  setShowUploadCaseForm,
  setShowSuccessUpdateMessage,
  editCaseID,
  casesData,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [getStatusDisputeName, setGetStatusDisputeName] = useState();

  const { auth } = useAuth();
  const token = auth?.accessToken;

  const casesArray = casesData || [];
  const caseData = casesArray?.find((item) => item?._id === editCaseID);
  console.log(caseData, "==== edit case id needed ====");

  // React Hook form for form validation
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      propertyTitle: caseData?.propertyTitle,
      propertyOwner: caseData?.propertyOwner,
      registerTitle: caseData?.registeredTitleNumber,
      state: caseData?.state,
      surveyPlanNumber: caseData?.surveyPlanNumber,
      nameParties: caseData?.nameParties,
      suitNumber: caseData?.suitNumber,
      natureDispute: caseData?.natureDispute,
      courtDivision: caseData?.courtDivision,
      statusDispute: caseData?.statusDispute,
      dateCommencement: caseData?.dateCommencement,
      disposed: caseData?.disposed,
    },
  });

  const completeFormStep = async () => {
    let isValid = false;

    if (formStep === 0) {
      isValid = await trigger([
        "propertyTitle",
        "propertyOwner",
        "registerTitle",
        "state",
        "surveyPlanNumber",
        "nameParties",
      ]);
    } else if (formStep === 1) {
      isValid = await trigger([
        "suitNumber",
        "natureDispute",
        "courtDivision",
        "statusDispute",
        "dateCommencement",
        "disposed",
      ]);
    }

    if (isValid && formStep < 1) {
      setFormStep(formStep + 1);
    }
  };

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsUpdating(true);

    const body = {
      propertyTitle: data?.propertyTitle,
      propertyOwner: data?.propertyOwner,
      registeredTitleNumber: data?.registerTitle,
      state: data?.state,
      surveyPlanNumber: data?.surveyPlanNumber,
      nameParties: data?.nameParties,
      suitNumber: data?.suitNumber,
      natureDispute: data?.natureDispute,
      courtDivision: data?.courtDivision,
      statusDispute: getStatusDisputeName
        ? getStatusDisputeName
        : data?.statusDispute,
      dateCommencement: data?.dateCommencement,
      disposed: data?.disposed,
    };

    try {
      await EditCaseRequest(token, editCaseID, body);
      toast.success("Cases Edited Successful");
      queryClient.invalidateQueries("getCasesApi");
      setShowUploadCaseForm(false);
      setShowSuccessUpdateMessage(true);
    } catch (error) {
      // console.log(error?.response?.data?.message);
      // toast.error(error?.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        <p className="font-semibold text-[20px] bg-[#524A4C]  text-white p-3 md:px-10 rounded-t-2xl flex justify-between">
          Edit Uploaded Case
          <span
            className="cursor-pointer  font-bold"
            onClick={() => setShowUploadCaseForm(false)}
          >
            <GrFormClose size={30} />
          </span>
        </p>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          {formStep === 0 && (
            <UploadFormOne register={register} errors={errors} watch={watch}/>
          )}
          {formStep === 1 && (
            <EditUploadFormTwo
              register={register}
              errors={errors}
              setGetStatusDisputeName={setGetStatusDisputeName}
              caseData={caseData}
              setValue={setValue}
              getStatusDisputeName={getStatusDisputeName}
            />
          )}

          {/* =========Buttons   (Back Button and Search button) ======== */}
          <div className="flex gap-10 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
            {formStep === 0 ? (
              <>
                <div
                  onClick={() => setShowUploadCaseForm(false)}
                  className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
                >
                  Back
                </div>
                <input
                  type="button"
                  className="bg-[#524A4C] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
                  value="Next"
                  onClick={completeFormStep}
                />
              </>
            ) : (
              <>
                <div
                  className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
                  onClick={() => {
                    setFormStep(0);
                  }}
                >
                  Back
                </div>
                <button
                  disabled={isUpdating}
                  type="submit"
                  className="bg-[#524A4C]  w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
                  onClick={onSubmitHandler}
                >
                  {isUpdating ? "Updating...." : "Update"}
                </button>
              </>
            )}
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default EditCase;
