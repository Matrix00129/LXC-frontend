import { PaymentSuccessIcon } from "src/assets/PaymentSuccessIcon";

const PaymentSuccessThree = ({ setShowPaymentSuccessThree, setShowSearchResultThree }) => {
  return (
    <div className="border-2 border-blue-800 h-screen w-screen bg-[#EBEEF5] flex justify-center items-center -mt-4">
      <div className="bg-[#F5F6F7] rounded-md sm:rounded-2xl w-[70vw] max-w-[24.688rem] px-[0.6rem] sm:px-[1.5rem] md:px-[2.125rem] flex flex-col items-center pt-[1.5rem] sm:pt-[3rem] md:pt-[3.688rem] pb-[1rem] sm:pb-[1.8rem] md:pb-[2.438rem]">
        <PaymentSuccessIcon />
        <p className="text-center font-extrabold text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] py-[0.7rem] sm:py-[1.2rem] md:py-[2.063rem]">
          Successful Payment
        </p>
        <p className="whitespace-pre-line text-center font-medium text-[0.68rem] sm:text-[0.7rem] md:text-[0.75rem] mb-[1rem] sm:mb-[1.8rem] md:mb-[2.438rem]">
          Please check your email for{"\n"}payment receipt.
          {"\n"}You can now view and download Report.
        </p>
        <button
          style={{ width: "100%" }}
          onClick={() => {
            setShowPaymentSuccessThree(false);
            setShowSearchResultThree(true);
          }}
          className="bg-[#000] text-[#FFFFFF] text-[0.7rem] w-[8rem] h-[1.75rem] rounded-[0.55rem] font-semibold sm:w-[11.875rem] sm:h-[2.4rem] sm:rounded-[0.7rem] sm:text-[1rem] md:w-[14.875rem] md:h-[2.875rem] md:rounded-[1rem] md:text-[1.25rem] transition duration-700 ease-in-out hover:bg-white hover:text-[#000000] hover:border-[#000000] border-[1.3px]"
        >
          View Records
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessThree;
