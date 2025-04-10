import { GrFormClose } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ConfirmDelete = ({
  setShowConfirmDelete,
  setShowSuccessMessage,
  title,
  buttonName,
  handleDelete,
}) => {
  return (
    <>
      <div className="rounded-2xl bg-[#EEEEEE] w-[300px] md:w-[450px] mx-auto text-center text-[24px] cursor-pointer pb-6 lg:w-[500px] overflow-hidden">
        <div className="flex justify-end pr-2 md:pr-10 relative top-4">
          <span
            className="cursor-pointer font-bold"
            onClick={() => {
              setShowConfirmDelete(false);
            }}
          >
            <GrFormClose size={30} />
          </span>
        </div>
        <p className="font-bold pb-3  text-[22px]">{title}</p>
        <div
          className="bg-[#FAFAFA] py-10 mx-4 md:mx-10"
          onClick={() => {
            handleDelete(),
              setShowConfirmDelete(false),
              setShowSuccessMessage(true);
          }}
        >
          <div className=" space-x-4  flex items-center justify-center bg-[#EEEEEE] w-[100px] h-[100px] mx-auto rounded-full">
            {" "}
            <MdOutlineDeleteOutline
              size={48}
              className="text-[#000000] cursor-pointer"
            />
          </div>
          <p className="text-[#000000] w-fit mt-4 mx-auto rounded-md text-[18px] p-2 font-semibold">
            {buttonName}
          </p>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
