import { FiX } from "react-icons/fi";
import { DownloadRecordIcon } from "src/assets/DownloadRecordIcon";
import { SaveToEmailIcon } from "src/assets/SaveToEmailIcon";

const baseURL = import.meta.env.VITE_BASEURL;

const DownloadRecordThree = ({ setShowDownloadAndEmail, userId, referenceId, setShowSearchSuccessThree }) => {
  const handleDownloadAndEmailClose = () => {
    setShowDownloadAndEmail(false);
    setShowSearchSuccessThree(true);
  };

  const handleActionClick = () => {
    setShowDownloadAndEmail(false);
    setShowSearchSuccessThree(true);
  };

  return (
    <div className="flex justify-center relative">
      <div className="relative top-[22%] flex flex-col items-center bg-[#EEEEEE] border border-[#E8E8E8] shadow-lg rounded-[0.7rem] sm:rounded-[0.9rem] md:rounded-[1.125rem] w-[300px] md:w-[450px] py-10 px-2">
        {/* Modal title */}
        <p className="font-black text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] mb-6">
          Download Record
        </p>

        <div className="flex justify-around sm:justify-center sm:gap-[3.188rem] bg-[#FAFAFA] shadow-md border border-[#E8E8E8] w-[90%] sm:max-w-[20.375rem] rounded-lg sm:rounded-[12px] p-8">
          <a
            href={`${baseURL}/download/${userId}/${referenceId}`}
            rel="noopener noreferrer"
            target="_blank"
            onClick={handleActionClick}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="bg-[#EEEEEE] rounded-[50%] w-[3rem] h-[3rem] flex justify-center items-center mb-[0.8rem] sm:mb-[1rem] md:mb-[1.25rem]">
                <DownloadRecordIcon />
              </div>
              <p className="font-extrabold text-[#000] text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem]">
                Download
              </p>
            </div>
          </a>
          <a
            href={`${baseURL}/payment/send/${userId}/${referenceId}`}
            rel="noopener noreferrer"
            target="_blank"
            onClick={handleActionClick}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="bg-[#EEEEEE] rounded-[50%] w-[3rem] h-[3rem] flex justify-center items-center mb-[0.8rem] sm:mb-[1rem] md:mb-[1.25rem]">
                <SaveToEmailIcon />
              </div>
              <p className="font-extrabold text-[#000] text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem]">
                Save to Email
              </p>
            </div>
          </a>
        </div>

        {/* Cancel button */}
        <button
          onClick={handleDownloadAndEmailClose}
        >
          <FiX className="absolute top-0 right-0 bg-[#EAEAEA] rounded-full w-[1.375rem] h-[1.375rem] flex justify-center align-center mt-6 mr-10 " />
        </button>
      </div>
    </div>
  );
};

export default DownloadRecordThree;
