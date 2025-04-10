import { useState } from "react";
import { HammerIcon } from "../../../assets/HammerIcon";
import {
  PercentageBarIcon,
  PercentageBarIconTwo,
} from "../../../assets/PercentageBarIcon";
import { PropertiesIcon } from "../../../assets/PropertiesIcon";
import { Modal } from "../../Modals/Modal";
import PropertyInformation from "./PropertyInformation";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import SearchPageLayout from "./SearchPageLayout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { SearchByValuesRequest } from "../../../Services/LandingPageRequest/landingpage.request";
import BlurredSearchLayout from "../../search-page/BlurredSearchLayout";
import { AccessModal } from "../../Modals/AccessModal";
import useAuth from "../../../hooks/useAuth";
import PaymentDetails from "./PaymentDetails";
import PaymentSuccess from "./PaymentSuccess";
import SearchSuccess from "./SearchSuccess";
import { CaseInformationModal } from "../../Modals/CaseInformationModal";
import DownloadRecord from "../../Modals/DownloadRecord";
import CaseInformationTwo from "./CaseInformationTwo";
import { CaseResultModal } from "../../Modals/CaseResultModal";
import SearchPageLayoutTwo from "./SearchPageLayoutTwo";
import BlurredSearchLayoutTwo from "../../search-page/BlurredSearchLayoutTwo";
import PaymentDetailsTwo from "./PaymentDetailsTwo";
import PaymentSuccessTwo from "./PaymentSuccessTwo";

const schema = yup.object().shape({
  propertyTitle: yup.string(),
  propertyOwner: yup.string(),
  registerTitle: yup.string(),
  state: yup.string().required("Property Location is required"),
  lga: yup.string().required("Property Location is required"),
  surveyPlanNumber: yup.string(),
  matchedCriteria: yup.string(),
});

const AnalyticsCard = ({ userDashboardData, settingsData }) => {
  const [showPropertyInformation, setShowPropertyInformation] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchResultTwo, setShowSearchResultTwo] = useState(false);
  const [selectedCaseData, setSelectedCaseData] = useState(null);
  const [showCaseInformation, setShowCaseInformation] = useState(false);
  const [showSearchResultData, setShowSearchResultData] = useState();
  const [showBlurredScreenTwo, setShowBlurredScreenTwo] = useState(false);
  const [showBlurredScreen, setShowBlurredScreen] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showPaymentDetailsTwo, setShowPaymentDetailsTwo] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentSuccessTwo, setShowPaymentSuccessTwo] = useState(false);
  const [showSearchSuccess, setShowSearchSuccess] = useState(false);
  const [showDownloadAndEmail, setShowDownloadAndEmail] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentResponseTwo, setPaymentResponseTwo] = useState(null);

  const [isSearching, setIsSearching] = useState(false);

  const { auth } = useAuth();
  let firstName = auth?.firstName?.toUpperCase();

  // React Hook form for form validation
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm({ resolver: yupResolver(schema) });

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsSearching(true);
    const body = {
      propertyTitle: data?.propertyTitle,
      propertyOwner: data?.propertyOwner,
      registeredTitleNumber: data?.registerTitle,
      state: data?.state,
      lga: data?.lga,
      surveyPlanNumber: data?.surveyPlanNumber,
      matchedCriteria: data?.matchedCriteria,
    };

    try {
      const response = await SearchByValuesRequest(body);
      setShowSearchResultData(response);
      toast.success("Search Successful");
      setTimeout(() => {
        setShowPropertyInformation(false);
        setShowSearchResult(true);
      }, 3000);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div>
        <section className="space-y-8 md:flex  md:gap-8 md:space-y-0  mt-10">
          {/* ========= CARD ONE ============= */}
          <div className="bg-[#524A4C] p-6 md:p-10 rounded-[24px]  md:flex justify-between md:gap-16 md:w-2/3">
            {/* ===============User Name and short information with buttons ========= */}
            <section className="text-white">
              <p>
                Hello, <span className="font-bold">{firstName}</span>
              </p>
              <p className="text-[14px] max-w-[320px] mt-4 mb-10">
                The User Dashboard is designed to efficiently manage the biodata
                of your searches.{" "}
              </p>
              <div
                className="bg-white max-w-[200px] text-center p-3 rounded-xl text-[#332F2F] cursor-pointer"
                onClick={() => setShowPropertyInformation(true)}
              >
                Search property
              </div>
              <p className="mt-6 text-[14px]">How property search work?</p>
            </section>
            {/* ============Total Properties and Total Lispendens statistics ========= */}
            <section className="text-white flex mt-6 justify-between gap-4 md:block md:space-y-6">
              <div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#A39397] rounded-xl w-[52px] h-[52px] flex items-center justify-center ">
                    <PropertiesIcon />
                  </div>
                  <p className="text-[28px]">
                    {userDashboardData?.data?.totalProperties}
                  </p>
                </div>
                <p className="text-[12px] mt-1">Total Properties</p>
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#A39397] rounded-xl w-[52px] h-[52px] flex items-center justify-center ">
                    <HammerIcon />
                  </div>
                  <p className="text-[28px]">
                    {" "}
                    {userDashboardData?.data?.totalLispendes}
                  </p>
                </div>
                <p className="text-[12px] mt-1">Total Lispendens</p>
              </div>
            </section>
          </div>

          {/* ========= CARD TWO ======= */}
          <div className="bg-[#D7D7D7]  p-6 md:p-10  rounded-[24px]  md:w-1/3">
            <p>Profile</p>
            <div className="flex items-center justify-between my-8">
              <div>
                <p className="text-[44px]">{`${
                  settingsData?.data?.photoUrl ? "100%" : "80%"
                }`}</p>
                <p>Completeness</p>
              </div>
              <div>
                {settingsData?.data?.photoUrl ? (
                  <PercentageBarIconTwo />
                ) : (
                  <PercentageBarIcon />
                )}
              </div>
            </div>
            <Link
              to="settings"
              className="bg-white flex justify-between items-center rounded-xl p-3"
            >
              <p className="text-[12px]">Proceed to complete your profile</p>
              <div className="text-[10px] bg-[#000000] text-white rounded-xl">
                {" "}
                <GrFormNext size={20} className="cursor-pointer " />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* =================Modals ================== */}

      {/* =====Add Property Information modal ===== */}
      <Modal
        show={showPropertyInformation}
        onClose={() => setShowPropertyInformation(false)}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <PropertyInformation
            setShowPropertyInformation={setShowPropertyInformation}
            register={register}
            errors={errors}
            watch={watch}
            isSearching={isSearching}
          />
        </form>
      </Modal>

      {/* ===Show search information=== */}
      <Modal show={showSearchResult} onClose={() => setShowSearchResult(false)}>
        <SearchPageLayout
          setShowSearchResult={setShowSearchResult}
          showSearchResultData={showSearchResultData}
          setShowBlurredScreen={setShowBlurredScreen}
        />
      </Modal>

      {/* ===Show Blurred screen=== */}
      <AccessModal
        show={showBlurredScreen}
        onClose={() => setShowBlurredScreen(false)}
      >
        {/* ====== MainContent goes here ..... =========== */}
        <section className="bg-[#ebeef5] flex flex-col items-center mx-[10px] md:p-[8px] overflow-hidden">
          <BlurredSearchLayout
            setShowBlurredScreen={setShowBlurredScreen}
            setShowPaymentDetails={setShowPaymentDetails}
          />
        </section>
      </AccessModal>

      {/* ===Payment details screen=== */}
      <AccessModal
        show={showPaymentDetails}
        onClose={() => setShowPaymentDetails(false)}
      >
        <PaymentDetails
          setShowPaymentDetails={setShowPaymentDetails}
          setShowPaymentSuccess={setShowPaymentSuccess}
          selectedCaseData={selectedCaseData}
          setPaymentResponse={setPaymentResponse}
        />
      </AccessModal>

      {/* ===Success Payment screen=== */}
      <AccessModal
        show={showPaymentSuccess}
        onClose={() => setShowPaymentSuccess(false)}
      >
        <PaymentSuccess
          showSearchResultData={showSearchResultData}
          setShowPaymentSuccess={setShowPaymentSuccess}
          setShowCaseInformation={setShowCaseInformation}
          setShowSearchResultTwo={setShowSearchResultTwo}
        />
      </AccessModal>

      {/* === SearchPageLayoutTwo screen=== */}
      <CaseResultModal
        show={showSearchResultTwo}
        onClose={() => setShowSearchResultTwo(false)}
      >
        <SearchPageLayoutTwo
          setShowSearchResultTwo={setShowSearchResultTwo}
          showSearchResultData={showSearchResultData}
          setSelectedCaseData={setSelectedCaseData}
          selectedCaseData={selectedCaseData}
          setShowCaseInformation={setShowCaseInformation}
        />
      </CaseResultModal>

      {/* ===Show case information=== */}
      <CaseInformationModal
        show={showCaseInformation}
        onClose={() => {
          setShowCaseInformation(false), setShowSearchResultTwo(true);
        }}
      >
        <section className="bg-[#ebeef5] pb-6">
          <CaseInformationTwo
            selectedCaseData={selectedCaseData}
            setShowDownloadAndEmail={setShowDownloadAndEmail}
            setShowBlurredScreenTwo={setShowBlurredScreenTwo}
            setShowCaseInformation={setShowCaseInformation}
            setShowSearchResultTwo={setShowSearchResultTwo}
          />
        </section>
      </CaseInformationModal>

      {/* ===Show Blurred screen=== */}
      <AccessModal
        show={showBlurredScreenTwo}
        onClose={() => setShowBlurredScreenTwo(false)}
      >
        {/* ====== MainContent goes here ..... =========== */}
        <section className="bg-[#ebeef5] flex flex-col items-center mx-[10px] md:p-[8px] overflow-hidden">
          <BlurredSearchLayoutTwo
            setShowBlurredScreenTwo={setShowBlurredScreenTwo}
            setShowPaymentDetailsTwo={setShowPaymentDetailsTwo}
          />
        </section>
      </AccessModal>

      {/* ===Payment details screen=== */}
      <AccessModal
        show={showPaymentDetailsTwo}
        onClose={() => setShowPaymentDetailsTwo(false)}
      >
        <PaymentDetailsTwo
          setShowPaymentDetailsTwo={setShowPaymentDetailsTwo}
          setShowPaymentSuccessTwo={setShowPaymentSuccessTwo}
          selectedCaseData={selectedCaseData}
          setPaymentResponseTwo={setPaymentResponseTwo}
        />
      </AccessModal>

      {/* ===Success Payment screen=== */}
      <AccessModal
        show={showPaymentSuccessTwo}
        onClose={() => setShowPaymentSuccessTwo(false)}
      >
        <PaymentSuccessTwo
          setShowPaymentSuccessTwo={setShowPaymentSuccessTwo}
          setShowDownloadAndEmail={setShowDownloadAndEmail}
        />
      </AccessModal>

      {/* ===Download and Send Email modal ==== */}
      <Modal
        show={showDownloadAndEmail}
        onClose={() => setShowDownloadAndEmail(false)}
      >
        <DownloadRecord
          setShowDownloadAndEmail={setShowDownloadAndEmail}
          userId={paymentResponseTwo?.data?.userId}
          referenceId={paymentResponseTwo?.data?.reference}
          setShowSearchSuccess={setShowSearchSuccess}
        />
      </Modal>

      {/* ===Success Search screen=== */}
      <AccessModal
        show={showSearchSuccess}
        onClose={() => setShowSearchSuccess(false)}
      >
        <SearchSuccess setShowSearchSuccess={setShowSearchSuccess} />
      </AccessModal>
    </>
  );
};

export default AnalyticsCard;
