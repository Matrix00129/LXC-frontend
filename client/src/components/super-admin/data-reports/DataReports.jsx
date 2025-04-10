import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import Report from "./Report";
import AdminUpload from "./AdminUpload";
import CaseRecordReport from "./CaseRecordReport";

const DataReports = () => {
  return (
    <>
      <div>
        {/* ===========Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Data Reports"
            subHeadings="Track your searches and manage overall activities"
          />
        </section>
        {/* ============= Main Content  ============== */}
        <section>
          {" "}
          <div className="mt-8 rounded-2xl border-[1px]  border-slate-200  bg-white">
            <CaseRecordReport />
          </div>
          <section className="space-y-10 md:flex md:space-x-6 md:space-y-0 mt-6 max-h-[250px] 2xl:max-h-fit">
            <div className=" rounded-2xl border-[1px] border-slate-200 bg-white md:w-1/4 p-6 text-[14px] pb-8">
              <AdminUpload />
            </div>
            <div className="rounded-2xl border-[1px]  border-slate-200 md:w-3/4   bg-white">
              <Report />
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default DataReports;
