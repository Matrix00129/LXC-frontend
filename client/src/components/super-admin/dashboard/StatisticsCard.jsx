import { TotalSearchIcon } from "src/assets/TotalSearchIcon";
import { TotalOnAppealIcon } from "src/assets/TotalOnAppealIcon";
import { TotalPendingIcon } from "src/assets/TotalPendingIcon";
import { TotalDismissedIcon } from "src/assets/TotalDismissedIcon";

const StatisticsCard = ({ activityLogsData }) => {
  console.log(activityLogsData, "this is the activityLogsdatas =====");
  return (
    <>
      <div>
        <section className="bg-skin-fill grid grid-cols-2 p-8 mt-6 lg:h-[150px] rounded-2xl text-white justify-center md:grid-cols-4 lg:flex items-center lg:justify-between pl-8 lg:px-20">
          {/* Statistics One */}
          <div className="lg:flex items-center gap-4 md:border-r-[1.4px] md:border-white h-fit md:pr-10 md:pl-4">
            <TotalSearchIcon />
            <div>
              <p className="text-[20px] md:text-[32px] font-bold">
                {activityLogsData?.data?.totalSearch}
              </p>
              <p className="text-[12px] md:text-[14px]">Total searches</p>
            </div>
          </div>

          {/* Statistics two */}
          <div className="ml-6 md:ml-0  lg:flex items-center gap-4 md:border-r-[1.4px] md:border-white h-fit md:pr-10 md:pl-4">
            <TotalPendingIcon />
            <div>
              <p className="text-[20px] md:text-[32px] font-bold">
                {" "}
                {activityLogsData?.data?.totalPending}
              </p>
              <p className="text-[12px] md:text-[14px]">Total pending</p>
            </div>
          </div>

          {/* Statistics three */}
          <div className="mt-8 md:mt-0 lg:flex items-center gap-4 md:border-r-[1.4px] md:border-white h-fit md:pr-10 md:pl-4">
            <TotalOnAppealIcon />
            <div>
              <p className="text-[20px] md:text-[32px] font-bold">
                {" "}
                {activityLogsData?.data?.totalAppeal}
              </p>
              <p className="text-[12px] md:text-[14px]">Total On appeal</p>
            </div>
          </div>

          {/* Statistics four */}
          <div className="mt-8 ml-6 md:ml-0 md:mt-0 lg:flex items-center gap-4 h-fit md:pr-10 md:pl-4">
            <TotalDismissedIcon />
            <div>
              <p className="text-[20px] md:text-[32px] font-bold">
                {" "}
                {activityLogsData?.data?.totalDisposed}
              </p>
              <p className="text-[12px] md:text-[14px]">Total Dismissed</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StatisticsCard;
