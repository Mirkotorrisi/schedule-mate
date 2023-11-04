import "./index.scss";
import React from "react";
import Day from "../Day";
import { ModalProvider } from "../../context/ModalContext";
import { useCalendar } from "./useCalendar";

const Calendar = () => {
  const { week, setWeek, WEEKDAYS, dayOfWeek, slicedEvents } = useCalendar();
  return (
    <ModalProvider>
      <div className="calendar-week">
        <div className="flex justify-between p-3 header">
          {!!week && (
            <span onClick={() => setWeek((prev) => prev - 1)}>{"<"}</span>
          )}
          <span onClick={() => setWeek(0)}>Today</span>
          <span onClick={() => setWeek((prev) => prev + 1)}>{">"}</span>
        </div>

        <ol className="font-bold py-2 grid grid-cols-5">
          {WEEKDAYS.map((day, index) => (
            <li className="text-center mx-2" key={day}>
              {day}
              <Day
                numberOfDays={index + 1 - dayOfWeek + 7 * week}
                appointments={slicedEvents}
              />
            </li>
          ))}
        </ol>
      </div>
    </ModalProvider>
  );
};

export default Calendar;
