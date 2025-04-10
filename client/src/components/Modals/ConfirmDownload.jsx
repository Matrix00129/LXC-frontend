import { MdOutlineFileDownload } from "react-icons/md";

const ConfirmDownload = ({
  setShowConfirmDownload,
  setShowSuccessDownloadMessage,
  title,
  content,
  buttonName,
}) => {
  return (
    <>
      <div
        className="rounded-2xl bg-white w-[300px]   md:max-w-[360px] mx-auto text-center text-[24px] cursor-pointer pb-6 lg:w-[400px] overflow-hidden"
        onClick={() => {
          setShowConfirmDownload(false);
          setShowSuccessDownloadMessage(true);
        }}
      >
        <p className="border-b-[1.3px] border-slate-200 pt-4 pb-3  text-[22px]">
          {title}
        </p>
        <div className="my-10 space-x-4  flex items-center justify-center">
          {" "}
          <MdOutlineFileDownload size={24} className="text-[#E82F2F] " />
          <span className="text-[20px]">{content}</span>
        </div>
        <p className="text-white bg-[#E37C42] w-[250px] md:w-[300px] mx-auto rounded-md text-[18px] p-2">
          {buttonName}
        </p>
      </div>
    </>
  );
};

export default ConfirmDownload;
