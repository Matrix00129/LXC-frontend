import DataReport from "./DataReport";
import Users from "./Users";

const ReportUsers = () => {
  return (
    <section className="space-y-10 md:flex md:space-x-6 md:space-y-0 mt-6 max-h-[290px] ">
      <div className=" rounded-2xl border-[1px]  border-slate-200 bg-white md:w-1/4 p-6 text-[14px] pb-8">
        <Users />
      </div>
      <div className="rounded-2xl border-[1px]  border-slate-200 pb-10 md:w-3/4 bg-white">
        <DataReport />
      </div>
    </section>
  );
};

export default ReportUsers;
