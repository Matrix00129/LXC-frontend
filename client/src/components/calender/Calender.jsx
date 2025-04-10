import { useEffect, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from "date-fns";
import DateButton from "./DateButton";

const Calender = ({
  setUpdatedFilteredLogs,
  setUploadedFilteredLogs,
  setSelectedDate,
  selectedDate,
  newActivityLogsData,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [defaultSelectedDate, setDefaultSelectedDate] = useState(new Date());

  useEffect(() => {
    setDefaultSelectedDate(new Date()); 
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedLogs = newActivityLogsData.data.updatedLogs.filter(
      (log) => log.timestamp === format(date, "d MMMM EEE")
    );
    setUpdatedFilteredLogs(selectedLogs);

    const UploadedSelectedLogs = newActivityLogsData.data.uploadedLogs.filter(
      (log) => log.timestamp === format(date, "d MMMM EEE")
    );
    setUploadedFilteredLogs(UploadedSelectedLogs);
  };

  return (
    <>
      <section className="flex gap-x-10 justify-between ">
        <div className="w-[700px] overflow-x-auto">
          <div className="flex flex-row items-center gap-3">
            <div className="overflow-x-scroll flex flex-row gap-4">
              {eachDayOfInterval({
                start: startOfMonth(currentMonth),
                end: endOfMonth(currentMonth),
              }).map((day) => (
                <DateButton
                  key={format(day, "yyyy-MM-dd")}
                  day={format(day, "EEE")}
                  date={format(day, "d")}
                  month={format(currentMonth, "MMM")}
                  isSelected={isSameDay(day, selectedDate || defaultSelectedDate)}
                  onSelect={() => handleDateSelect(day)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calender;
