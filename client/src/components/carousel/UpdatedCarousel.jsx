import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { formatDate } from "../../Services/SuperAdminRequest/activitylogs.request";

const UpdatedCarousel = ({ updatedFilteredLogs }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [AutoPlay()]);
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {/* ==== Updated container ==== */}
        {updatedFilteredLogs?.length !== 0 &&
          updatedFilteredLogs?.map((update, idx) => (
            <div
              key={idx}
              className="bg-[#4D4A49] text-[12px] p-3
            3 text-white flex items-center justify-center w-[800px]"
            >
              <p className="font-semibold ">UPDATED:</p>{" "}
              <div className="space-x-2 pl-2 w-[300px] flex lg:flex lg:w-[560px]">
                <p>{update?.userId?.firstName}</p>{" "}
                <p>{update?.userId?.lastName}</p>{" "}
                <p> {update?.userId?.email}</p>{" "}
                <p>{update?.entityId?.nameParties}</p>{" "}
                <p>{formatDate(`${update?.entityId?.createdAt}`)}</p>
              </div>
            </div>
          ))}

        {updatedFilteredLogs?.length === 0 && (
          <div
            className="bg-[#4D4A49] text-[12px] p-3
            3 text-white w-[800px]"
          >
            <p className=" pl-2 w-[300px] text-center lg:w-[560px]">
              No Updated Activity Logs
            </p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdatedCarousel;