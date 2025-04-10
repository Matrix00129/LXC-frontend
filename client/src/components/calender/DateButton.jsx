import { isToday } from "date-fns";

const DateButton = ({ day, date, month, isSelected, onSelect }) => {
  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    parseInt(date)
  );
  return (
    <button
      className={`rounded-lg border-[#D0D5DD] hover:bg-white hover:border-slate-200 hover:shadow-md hover:border-opacity-0 hover:ring-1 hover:ring-offset- hover:ring-slate-200 ${
        isSelected
          ? "bg-[#ebeef5] text-slate-500 rounded-lg"
          : isToday(currentDate)
          ? "bg-black text-white"
          : ""
      }`}
      onClick={onSelect}
    >
      <div
        className={`flex h-[80px] w-[150px] flex-col justify-center items-center ${
          isSelected
            ? "bg-slate-300 text-slate-500 rounded-lg"
            : isToday(currentDate)
            ? "bg-black text-white rounded-lg"
            : ""
        }`}
      >
        <p className="font-semibold">
          {date} {month}{" "}
        </p>
        <h1>{day}</h1>
      </div>
    </button>
  );
};

export default DateButton;
