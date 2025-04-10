import UploadFormTwo from "./UploadFormTwo";
import UploadFormOne from "./UploadFormOne";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateCaseRequest,
  UploadCaseByCsvRequest,
} from "../../../Services/SuperAdminRequest/cases.request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const schema = yup.object().shape({
  propertyTitle: yup.string().required("Property Title is required"),
  propertyOwner: yup.string().required("Property Owner is required"),
  registeredTitleNumber: yup.string().required("Register Title is required"),
  surveyPlanNumber: yup.string(),
  nameParties: yup.string().required("Name Parties is required"),
  suitNumber: yup.string().required("Suit Number is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("LGA is required"),
  plotStreetName: yup.string().required("Street Name is required"),
  plotNumber: yup.string().required("Plot Number is required"),
  city: yup.string().required("City is required"),
  natureDispute: yup.string().required("Nature Dispute is required"),
  courtDivision: yup.string().required("Judicial Division is required"),
  court: yup.string().required("Court is required"),
  courtRegistrarId: yup.string().required("Court Registrar is required"),
  statusDispute: yup.string().required("Status Dispute is required"),
  dateCommencement: yup.string().required("Date Commencement is required"),
  disposed: yup.string().test({
    name: "conditionallyRequired",
    test: function (value) {
      const statusDispute = this.resolve(yup.ref("statusDispute"));
      if (statusDispute === "Disposed") {
        return !!value; // Returns true if value is not empty
      }
      return true; // Returns true if value is optional
    },
    message:
      'Date of Disposal is required when the Status of dispute is "Disposed"',
  }),
});

const AddCase = ({ setShowUploadCaseForm, setShowSuccessMessage }) => {
  // const [isSaving, setIsSaving] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [showFileName, setShowFileName] = useState("");
  const [getStatusDisputeName, setGetStatusDisputeName] = useState();
  const [courtRegistrars, setCourtRegistrars] = useState([]); // To store fetched court registrars

  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Hook form for form validation
  const queryClient = useQueryClient();

  const handleUploadCaseCsv = async ({ target: { files } }) => {
    if (files) {
      const fileType = files[0].type;
      if (fileType === "text/csv") {
        setShowFileName(files[0].name);
        const formData = new FormData();
        formData.append("csvFile", files[0]);

        const body = formData;
        try {
          await UploadCaseByCsvRequest(body, token);
          toast.success("Cases created from CSV successful");
          queryClient.invalidateQueries("getCasesApi");
          setShowUploadCaseForm(false);
        } catch (error) {
          console.log(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        }
      } else {
        console.log("Invalid File");
        toast.error("Invalid File");
      }
    }
  };

  // Download  case By Csv Format Logic
  //  const handleDownloadCase = async () => {
  //   try {
  //     await GetDownloadCaseRequest(token, caseID);
  //     toast.success("Uploaded Successful");
  //   } catch (error) {
  //     console.log(error?.response?.data?.message);
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  const {
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    register,
  } = useForm({ resolver: yupResolver(schema) });

  const completeFormStep = async () => {
    let isValid = false;

    if (formStep === 0) {
      isValid = await trigger([
        "propertyTitle",
        "propertyOwner",
        "registeredTitleNumber",
        "plotNumber",
        "plotStreetName",
        "state",
        "lga",
        "city",
        "surveyPlanNumber",
        "nameParties",
      ]);
    } else if (formStep === 1) {
      isValid = await trigger([
        "suitNumber",
        "natureDispute",
        "court",
        "courtDivision",
        "courtRegistrar",
        "courtRegistrarId",
        "statusDispute",
        "dateCommencement",
        // "disposed",
      ]);
    }

    if (isValid && formStep < 1) {
      setFormStep(formStep + 1);
    }
  };

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    // setIsSaving(true);
    const body = {
      propertyTitle: data?.propertyTitle,
      propertyOwner: data?.propertyOwner,
      registeredTitleNumber: data?.registeredTitleNumber,
      state: data?.state,
      lga: data?.lga,
      plotNumber: data?.plotNumber,
      plotStreetName: data?.plotStreetName,
      city: data?.city,
      surveyPlanNumber: data?.surveyPlanNumber,
      nameParties: data?.nameParties,
      suitNumber: data?.suitNumber,
      natureDispute: data?.natureDispute,
      court: data?.court,
      courtDivision: data?.courtDivision,
      registrarId: data?.courtRegistrarId,
      statusDispute: data?.statusDispute,
      dateCommencement: data?.dateCommencement,
      disposed: data?.statusDispute === "Disposed" ? data?.disposed : undefined,
    };

    try {
      await CreateCaseRequest(body, token);
      toast.success("Cases Added Successful");
      queryClient.invalidateQueries("getCasesApi");
      setShowUploadCaseForm(false);
      setShowSuccessMessage(true);
    } catch (error) {
      // console.log(error?.response?.data?.message);
      // toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        <div className="font-semibold text-[20px] bg-[#524A4C]  text-white p-3 md:px-10 rounded-t-2xl flex justify-between">
          Upload case
          <div className="flex gap-4 items-center">
            <p className="text-[12px] text-green-300">{showFileName}</p>
            <div className="bg-[#8E8E8E] w-[180px] rounded-xl text-center items-center text-[14px] flex justify-between text-white font-semibold p-2 cursor-pointer">
              <label
                htmlFor="fileInput"
                className="flex w-full  justify-between tracking-wide cursor-pointer"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <input
                    type="file"
                    name="user_Image"
                    id="fileInput"
                    accept=".csv"
                    className="hidden input-field"
                    onChange={handleUploadCaseCsv}
                  />
                  <p className="w-full flex items-center justify-center">
                    Upload by CSV
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-[#8E8E8E] w-[180px] rounded-xl text-center items-center text-[14px] flex justify-center text-white font-semibold p-2 cursor-pointer">
              Download CSV format
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          {formStep === 0 && (
            <UploadFormOne register={register} errors={errors} watch={watch} />
          )}
          {formStep === 1 && (
            <UploadFormTwo
              register={register}
              errors={errors}
              token={token}
              setGetStatusDisputeName={setGetStatusDisputeName}
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
                <button
                  type="button"
                  className="bg-[#524A4C] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
                  onClick={completeFormStep}
                >
                  Next
                </button>
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
                  type="submit"
                  className="bg-[#524A4C]  w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
                  onClick={onSubmitHandler}
                  // disabled={isSaving}
                >
                  Submit
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

export default AddCase;
