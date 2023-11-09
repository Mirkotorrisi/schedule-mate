import "./index.scss";
import React from "react";
import Day from "../Day";
import { ModalProvider } from "../../context/ModalContext";
import { useCalendar } from "./useCalendar";

const Calendar = () => {
  const { week, setWeek, WEEKDAYS, todayIndexOnWeek, slicedEvents } =
    useCalendar();
  return (
    <ModalProvider>
      <div className="calendar-week rounded-md overflow-hidden">
        <div className="flex justify-between p-3 header">
          {!!week && (
            <span
              className="underline"
              onClick={() => setWeek((prev) => prev - 1)}
            >
              {"< Past week"}
            </span>
          )}
          <span className="underline" onClick={() => setWeek(0)}>
            This week
          </span>
          <span
            className="underline"
            onClick={() => setWeek((prev) => prev + 1)}
          >
            {"Next week >"}
          </span>
        </div>

        <ol className="font-bold py-2 grid grid-cols-5">
          {WEEKDAYS.map((day, index) => (
            <li className="text-center mx-2" key={day}>
              {day}
              <Day
                numOfDaysFromToday={index + 1 - todayIndexOnWeek + 7 * week}
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
