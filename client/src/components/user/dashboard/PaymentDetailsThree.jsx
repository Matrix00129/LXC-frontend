import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaymentSearchReportRequest } from "src/Services/LandingPageRequest/payment.request";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .min(16, "Card Number must be greater than 15 letters")
    .max(19, "Card Number must be less than 20 letters"),
  date: yup.string().required("Date is required"),
  cvv: yup.string().required("CVV is required"),
});

const PaymentDetailsThree = ({
  setShowPaymentSuccessThree,
  setShowPaymentDetailsThree,
  selectedCaseData,
  caseData,
  setPaymentResponse,
}) => {
  const [isPaying, setIsPaying] = useState(false);

  const { auth } = useAuth();
  const token = auth?.accessToken;

  console.log(caseData, "this is the caseId need here ===");

  // React Hook form for form validation
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema) });

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsPaying(true);

    let expireDate = data?.date;
    const [year, month] = expireDate.split("-");

    const body = {
      username: data?.username,
      email: data?.email,
      cardNumber: data?.cardNumber,
      cvv: data?.cvv,
      expiryMonth: month,
      expiryYear: year,
      caseId: caseData,
      // userId: selectedCaseData.userId, 
      // referenceId: selectedCaseData._id
    };

    try {
      const response = await PaymentSearchReportRequest(body, token);
      setPaymentResponse(response);
      toast.success("Payment Successful");
      setTimeout(() => {
        setShowPaymentDetailsThree(true);
        setShowPaymentSuccessThree(true);
      }, 3000);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <div className="bg-[#EBEEF5]* flex justify-center items-center font-Avenir h-screen">
        <div className="flex flex-col justify-center bg-[#F5F6F7] w-[80vw] sm:max-w-[31.875rem] rounded-[0.45rem] sm:rounded-[0.5rem] md:rounded-[0.55rem] pt-[0.7rem] sm:pt-[0.9rem] md:pt-[1.1rem] px-[1rem] sm:px-[2.3rem] md:px-[2.875rem] pb-[1rem] sm:pb-[1.2rem] md:pb-[1.5rem]">
          {/* ====== Payment form title ====== */}
          <h1 className="text-center font-black text-[1.3rem] sm:text-[1.6rem] md:text-[2rem]">
            Payment Details
          </h1>
          {/* ====== Form section ====== */}
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col justify-center w-full mt-[1rem] sm:mt-[1.5rem] md:mt-[1.875rem]"
          >
            <div className="mb-[0.7rem] sm:mb-[0.9rem] md:mb-[1.125rem]">
              <input
                type="text"
                name="username"
                placeholder="Name"
                {...register("username")}
                className="bg-[#F5F6F7] border border-[#A3A3A3] w-[100%] h-[2rem] sm:h-[2.3rem] md:h-[2.625rem] rounded-[0.4rem] sm:rounded-[0.45rem] md:rounded-[0.5rem]  placeholder:font-normal placeholder:text-[#8A8A8A] placeholder:text-[0.65rem] placeholder:sm:text-[0.7rem] placeholder:md:text-[0.75rem] px-[0.4rem] sm:px-[0.8rem] md:px-[1.063rem] py-[0.3rem] sm:py-[0.35rem] md:py-[0.438rem]"
              />
              <p className="text-red-500 text-[0.75rem] text-right">
                {errors.username?.message}
              </p>
            </div>

            <div className="mb-[0.7rem] sm:mb-[0.9rem] md:mb-[1.125rem]">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                {...register("email")}
                className="bg-[#F5F6F7] border border-[#A3A3A3] w-[100%] h-[2rem] sm:h-[2.3rem] md:h-[2.625rem] rounded-[0.4rem] sm:rounded-[0.45rem] md:rounded-[0.5rem]  placeholder:font-normal placeholder:text-[#8A8A8A] placeholder:text-[0.65rem] placeholder:sm:text-[0.7rem] placeholder:md:text-[0.75rem] px-[0.4rem] sm:px-[0.8rem] md:px-[1.063rem] py-[0.3rem] sm:py-[0.35rem] md:py-[0.438rem]"
              />
              <p className="text-red-500 text-[0.75rem] text-right">
                {errors.email?.message}
              </p>
            </div>

            <div className="mb-[0.9rem] sm:mb-[1.2rem] md:mb-[1.5rem]">
              <input
                type="text"
                name="cardNumber"
                placeholder="Debit card number"
                {...register("cardNumber")}
                className="bg-[#F5F6F7] border border-[#A3A3A3] w-[100%] h-[2rem] sm:h-[2.3rem] md:h-[2.625rem] rounded-[0.4rem] sm:rounded-[0.45rem] md:rounded-[0.5rem]  placeholder:font-normal placeholder:text-[#8A8A8A] placeholder:text-[0.65rem] placeholder:sm:text-[0.7rem] placeholder:md:text-[0.75rem] px-[0.4rem] sm:px-[0.8rem] md:px-[1.063rem] py-[0.3rem] sm:py-[0.35rem] md:py-[0.438rem]"
              />
              <p className="text-red-500 text-[0.75rem] text-right">
                {errors.cardNumber?.message}
              </p>
            </div>

            <div className="md:flex justify-between">
              <div className="mb-[0.9rem] sm:mb-[1.2rem] md:mb-[1.5rem]">
                <input
                  type="month"
                  name="date"
                  {...register("date")}
                  className="bg-[#F5F6F7] border border-[#A3A3A3] h-[2.3rem] sm:h-[2.6rem] md:h-[3rem]  rounded-[0.4rem] sm:rounded-[0.45rem] md:rounded-[0.5rem] placeholder:font-normal placeholder:text-[#8A8A8A] placeholder:text-[0.65rem] placeholder:sm:text-[0.7rem] placeholder:md:text-[0.75rem] px-[0.4rem] sm:px-[0.8rem] md:px-[1.063rem] py-[0.15rem] sm:py-[0.2rem] md:py-[0.25rem] w-full"
                  placeholder="MM/YY"
                />
                <p className="text-red-500 text-[0.75rem] text-right">
                  {errors.date?.message}
                </p>
              </div>

              <div className="mb-[0.9rem] sm:mb-[1.2rem] md:mb-[1.5rem]">
                <input
                  type="number"
                  name="cvv"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                  placeholder="CVV"
                  {...register("cvv")}
                  className="bg-[#F5F6F7] border border-[#A3A3A3] h-[2.3rem] sm:h-[2.6rem] md:h-[3rem] rounded-[0.4rem] sm:rounded-[0.45rem] md:rounded-[0.5rem] placeholder:font-normal placeholder:text-[#8A8A8A] placeholder:text-[0.65rem] placeholder:sm:text-[0.7rem] placeholder:md:text-[0.75rem] px-[0.4rem] sm:px-[0.8rem] md:px-[1.063rem] py-[0.15rem] sm:py-[0.2rem] md:py-[0.25rem] w-full"
                />
                <p className="text-red-500 text-[0.75rem] text-right">
                  {errors.cvv?.message}
                </p>
              </div>
            </div>

            {/* ====== Line break ====== */}
            <div className="h-[0.5px] w-full bg-[#D9D9D9] mt-[0.7rem] sm:mt-[1rem] md:mt-[1.2rem] mb-[0.9rem] sm:mb-[1.15rem] md:mb-[1.344rem]"></div>

            {/* ====== Pricing section ====== */}
            <div className="mb-[1rem] sm:mb-[1.2rem] md:mb-[1.5rem]">
              <div className="flex justify-between">
                <p className="font-normal text-[#8A8A8A] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  Subtotal
                </p>
                <p className="font-extrabold text-[#000] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  &#8358;490.00
                </p>
              </div>
              <div className="flex justify-between py-[0.7rem] sm:py-[0.9rem] md:py-[1.143rem]">
                <p className="font-normal text-[#8A8A8A] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  VAT
                </p>
                <p className="font-extrabold text-[#000] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  &#8358;3.41
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-black text-[#8A8A8A] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  Total
                </p>
                <p className="font-extrabold text-[#000] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]">
                  &#8358;493.41
                </p>
              </div>
            </div>

            {/* ====== Make payment button ====== */}
            <button
              disabled={isPaying}
              className="bg-[#000] text-[#FFF] font-extrabold border border-[#A1A1A1] rounded-[0.5rem] sm:rounded-[0.6rem] md:rounded-[0.7rem] h-[2.6rem] sm:h-[2.9rem] md:h-[3.25rem] text-[0.85rem] sm:text-[1.05rem] md:text-[1.25rem]"
            >
              {/* Make Payment */}
              {isPaying ? "Paying..." : "Make Payment"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PaymentDetailsThree;
