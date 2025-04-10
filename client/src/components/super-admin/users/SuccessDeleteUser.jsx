import { IoMdCheckmark } from "react-icons/io";

const SuccessDeleteUser = ({ setShowSuccessDeleteUser }) => {
  return (
    <>
      <div
        className="border-[1.2px] border-black rounded-2xl bg-white w-[300px]   md:max-w-[360px] h-[250px] mx-auto text-center text-[24px] cursor-pointer"
        onClick={() => {
          setShowSuccessDeleteUser(false);
        }}
      >
        <h3 className="border-b-[1.3px] border-slate-200 pt-4 pb-3 mb-10">
          Delete User
        </h3>
        <div className="w-14 h-14 mb-8 flex items-center justify-center mx-auto rounded-full animate-popping">
          {" "}
          <IoMdCheckmark className="text-4xl text-white font-bold" />
        </div>
        <p>Deleted</p>
      </div>
    </>
  );
};

export default SuccessDeleteUser;
