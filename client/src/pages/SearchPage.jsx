import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavBar from "src/components/navbar/NavBar";
import Button from "../components/search-page/Button";
import { Link } from "react-router-dom";
import SearchForm from "../components/search-page/SearchForm";
import { Modal } from "../components/Modals/Modal";
import SearchPageLayout from "../components/user/dashboard/SearchPageLayout";
import SearchPageLayoutTwo from "../components/user/dashboard/SearchPageLayoutTwo";
import { AccessModal } from "../components/Modals/AccessModal";
import BlurredSearchLayout from "../components/search-page/BlurredSearchLayout";
import BlurredSearchLayoutTwo from "../components/search-page/BlurredSearchLayoutTwo";
import PaymentDetails from "../components/user/dashboard/PaymentDetails";
import PaymentDetailsTwo from "../components/user/dashboard/PaymentDetailsTwo";
import PaymentSuccess from "../components/user/dashboard/PaymentSuccess";
import SearchSuccessTwo from "../components/user/dashboard/SearchSuccessTwo";
import { CaseInformationModal } from "../components/Modals/CaseInformationModal";
import { SearchByValuesRequest } from "../Services/LandingPageRequest/landingpage.request";
import DownloadRecordTwo from "../components/Modals/DownloadRecordTwo";
import CaseInformation from "../components/user/dashboard/CaseInformation";
import { CaseResultModal } from "../components/Modals/CaseResultModal";
import PaymentSuccessTwo from "../components/user/dashboard/PaymentSuccessTwo";
import PaymentDetailsThree from "../components/user/dashboard/PaymentDetailsThree";
import SearchPageLayoutThree from "../components/user/dashboard/SearchPageLayoutThree";
import SearchSuccessThree from "../components/user/dashboard/SearchSuccessThree";
import PaymentSuccessThree from "../components/user/dashboard/PaymentSuccessThree";
import DownloadRecordThree from "../components/Modals/DownloadRecordThree";
import CaseInformationThree from "../components/user/dashboard/CaseInformationThree";

const schema = yup.object().shape({
  propertyTitle: yup.string(),
  propertyOwner: yup.string(),
  registerTitle: yup.string(),
  state: yup.string().required("Property Location is required"),
  lga: yup.string().required("Property Location is required"),
  surveyPlanNumber: yup.string(),
  matchedCriteria: yup.string(),
});

const SearchPage = () => {
  const [showSearchResultData, setShowSearchResultData] = useState();
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchResultTwo, setShowSearchResultTwo] = useState(false);
  const [selectedCaseData, setSelectedCaseData] = useState(null);
  const [showBlurredScreenTwo, setShowBlurredScreenTwo] = useState(false);
  const [showBlurredScreen, setShowBlurredScreen] = useState(false);
  const [showCaseInformation, setShowCaseInformation] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showPaymentDetailsTwo, setShowPaymentDetailsTwo] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentSuccessTwo, setShowPaymentSuccessTwo] = useState(false);
  const [showSearchSuccessTwo, setShowSearchSuccessTwo] = useState(false);
  const [showDownloadAndEmail, setShowDownloadAndEmail] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentResponseTwo, setPaymentResponseTwo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [showSearchResultThree, setShowSearchResultThree] = useState(false);
  const [showCaseInformationThree, setShowCaseInformationThree] = useState(false);
  const [showPaymentDetailsThree, setShowPaymentDetailsThree] = useState(false);
  const [showPaymentSuccessThree, setShowPaymentSuccessThree] = useState(false);
  const [showSearchSuccessThree, setShowSearchSuccessThree] = useState(false);

  useEffect(() => {
    if (showSearchResultData?.data?.cases?.length > 0) {
      setCaseData(showSearchResultData.data.cases[0]._id);
    }
  }, [showSearchResultData]);
  console.log("id", caseData)

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
      <div className="h-screen bg-red-80">
        <div className="max-w-[1100px] mx-auto h-full flex flex-col">
          {/* ====== Navbar component ======= */}
          <section>
            <NavBar />
          </section>

          {/* ====== Main Content goes here ====== */}
          <section className="pt-19 sm:pt-[6rem] md:pt-30 mx-2 md:mx-6 h-full font-Chillax">
            <section className="md:grid md:grid-cols-2 w-full">
              {/* ====== First Column ====== */}
              <div className="mt-20 mb-10 flex flex-col items-center md:items-start md:mt-24 md:mb-0 w-full">
                <h1 className="text-[#000] text-[1.5rem] font-medium sm:text-[2.4rem] md:text-[2.625rem] whitespace-pre-line">
                  Get a better search{"\n"}experience
                </h1>
                <p className="text-[#000] font-medium leading-[2.5rem] text-[0.8rem] sm:text-[0.98rem] sm:leading-[2.7rem] md:text-[1.25rem] md:leading-[3rem]">
                  Sign in for free
                </p>
                <div>
                  <Button type="signin">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                  <Button type="login">
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </div>

              {/* ====== Second Column ====== */}
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <SearchForm
                    register={register}
                    errors={errors}
                    watch={watch}
                    isSearching={isSearching}
                  />
                </form>
              </div>
            </section>

            {/* ===Show search information=== */}
            <Modal
              show={showSearchResult}
              onClose={() => setShowSearchResult(false)}
            >
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
                  setShowPaymentDetailsThree={setShowPaymentDetailsThree}
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
                <CaseInformation
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
              <DownloadRecordTwo
                setShowDownloadAndEmail={setShowDownloadAndEmail}
                userId={paymentResponseTwo?.data?.userId}
                referenceId={paymentResponseTwo?.data?.reference}
                setShowSearchSuccessTwo={setShowSearchSuccessTwo}
              />
            </Modal>

            {/* ===Success Search screen=== */}
            <AccessModal
              show={showSearchSuccessTwo}
              onClose={() => setShowSearchSuccessTwo(false)}
            >
              <SearchSuccessTwo setShowSearchSuccessTwo={setShowSearchSuccessTwo} />
            </AccessModal>

       {/* SEARCH AND REPORT LOGIC */}
          {/* ===Payment details screen for search and report=== */}
            <AccessModal
              show={showPaymentDetailsThree}
              onClose={() => setShowPaymentDetailsThree(false)}
            >
              <PaymentDetailsThree
                setShowPaymentDetailsThree={setShowPaymentDetailsThree}
                setShowPaymentSuccessThree={setShowPaymentSuccessThree}
                caseData={caseData}
                setPaymentResponse={setPaymentResponse}
              />
            </AccessModal>

            {/* ===Success Payment screen for search and report=== */}
            <AccessModal
              show={showPaymentSuccessThree}
              onClose={() => setShowPaymentSuccessThree(false)}
            >
              <PaymentSuccessThree
                showSearchResultData={showSearchResultData}
                setShowPaymentSuccessThree={setShowPaymentSuccessThree}
                setShowCaseInformation={setShowCaseInformation}
                setShowSearchResultThree={setShowSearchResultThree}
              />
            </AccessModal>

            {/* search and report */}

            <CaseResultModal
              show={showSearchResultThree}
              onClose={() => setShowSearchResultThree(false)}
            >
              <SearchPageLayoutThree
                setShowSearchResultThree={setShowSearchResultThree}
                showSearchResultData={showSearchResultData}
                setSelectedCaseData={setSelectedCaseData}
                selectedCaseData={selectedCaseData}
                setShowCaseInformationThree={setShowCaseInformationThree}
              />
            </CaseResultModal>

            {/* ===Show case information=== */}
            <CaseInformationModal
              show={showCaseInformationThree}
              onClose={() => {
                setShowCaseInformationThree(false), setShowDownloadAndEmail(true);
              }}
            >
              <section className="bg-[#ebeef5] pb-6">
                <CaseInformationThree
                  selectedCaseData={selectedCaseData}
                  setShowDownloadAndEmail={setShowDownloadAndEmail}
                  setShowCaseInformationThree={setShowCaseInformationThree}
                  setShowSearchResultTwo={setShowSearchResultTwo}
                />
              </section>
            </CaseInformationModal>

            {/* ===Download and Send Email modal for search and report ==== */}
            <Modal
              show={showDownloadAndEmail}
              onClose={() => setShowDownloadAndEmail(false)}
            >
              <DownloadRecordThree
                setShowDownloadAndEmail={setShowDownloadAndEmail}
                userId={paymentResponseTwo?.data?.userId}
                referenceId={paymentResponseTwo?.data?.reference}
                setShowSearchSuccessThree={setShowSearchSuccessThree}
              />
            </Modal>
               {/* ===Success Search screen=== */}
               <AccessModal
              show={showSearchSuccessThree}
              onClose={() => setShowSearchSuccessThree(false)}
            >
              <SearchSuccessThree setShowSearchSuccessThree={setShowSearchSuccessThree} />
            </AccessModal>
          </section>  
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SearchPage;