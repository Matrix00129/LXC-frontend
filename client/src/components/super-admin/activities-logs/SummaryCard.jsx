import { useState } from "react";
import Calender from "../../calender/Calender";
import { UploadedCarousel } from "../../carousel/UploadedCarousel";
import UpdatedCarousel from "../../carousel/UpdatedCarousel";

const SummaryCard = ({ activityLogsData, newActivityLogsData }) => {
  const [updatedFilteredLogs, setUpdatedFilteredLogs] = useState([]);
  const [uploadedFilteredLogs, setUploadedFilteredLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <div>
        <section className="space-y-8 md:flex  md:gap-8 md:space-y-0  mt-10">
          {/* ========= CARD ONE ======= */}
          <div className="bg-white  p-6 md:p-8  rounded-[24px]  md:w-1/3 h-[280px]">
            <p className="text-[20px] font-semibold mb-4">Summary</p>
            <div className="relative pl-8">
              {/*========= circle one ======= */}
              <div className="bg-[#D5D5D5] rounded-full w-[120px] h-[120px] text-center flex flex-col items-center justify-center text-[#332C2C]">
                <p className="text-[32px] font-bold">
                  {activityLogsData?.data?.totalUpload}
                </p>
                <p className="text-[12px]">Total upload</p>
              </div>
              {/* ======= circle two ======= */}
              <div className="absolute top-[4.3rem] left-[7.3rem] bg-[#221F1D] rounded-full w-[120px] h-[120px] text-center flex flex-col items-center justify-center text-white">
                <p className="text-[32px] font-bold">
                  {activityLogsData?.data?.totalUpdate}
                </p>
                <p className="text-[12px]">Total update</p>
              </div>
            </div>
          </div>

          {/* =========CARD TWO = ======= */}
          <section className="border-[1.3px] rounded-[24px]  md:flex justify-between md:gap-16 md:w-2/3">
            <div className="w-full">
              {/* ===== Calender ==== */}
              <div className="bg-[#ebeef5] p-1 pb-4  border-[1.3px] rounded-t-[24px]">
                <Calender
                  newActivityLogsData={newActivityLogsData}
                  setUpdatedFilteredLogs={setUpdatedFilteredLogs}
                  setUploadedFilteredLogs={setUploadedFilteredLogs}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </div>

              {/* ========== Updated and Upload ===== */}
              <div className="h-full lg:h-[160px] p-3 text-[#A1A1A1] xl:h-[180px] pt-4 bg-white rounded-b-[24px] overflow-x-auto">
                {/* ===START TIME */}
                <p className="text-[14px]">11:00AM</p>
                <div className="ml-16">
                  {/* ====Carousels ==== */}
                  <UpdatedCarousel updatedFilteredLogs={updatedFilteredLogs} />
                  <UploadedCarousel
                    uploadedFilteredLogs={uploadedFilteredLogs}
                  />
                </div>
                {/* ====End TIME ==== */}
                <p className="text-[14px]">12:00PM</p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default SummaryCard;
