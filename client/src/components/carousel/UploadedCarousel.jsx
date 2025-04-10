import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { formatDate } from "../../Services/SuperAdminRequest/activitylogs.request";

export const UploadedCarousel = ({ uploadedFilteredLogs }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [AutoPlay()]);
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {/* ==== Updated container ==== */}
        {uploadedFilteredLogs?.length !== 0 &&
          uploadedFilteredLogs?.map((update, idx) => (
            <div
              key={idx}
              className="bg-[#DCDCDC] text-[#8A8A8A]  p-2 text-[12px]  flex items-center justify-center w-[800px]"
            >
              <p className="font-semibold ">UPLOADED:</p>{" "}
              <div className="space-x-2 pl-2 w-[300px] flex lg:flex lg:w-[560px]">
                <p>{update?.userId?.firstName}</p>{" "}
                <p>{update?.userId?.lastName}</p>{" "}
                <p> {update?.userId?.email}</p>{" "}
                <p>{update?.entityId?.nameParties}</p>{" "}
                <p>{formatDate(`${update?.entityId?.createdAt}`)}</p>
              </div>
            </div>
          ))}

        {uploadedFilteredLogs?.length === 0 && (
          <div className="bg-[#DCDCDC] text-[#8A8A8A]  text-[12px] p-3 w-[800px]">
            <p className=" pl-2 w-[300px] text-center lg:w-[560px]">
              No Uploaded Activity Logs
            </p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadedCarousel;