import React from "react";
import { DayProps, useDay } from "./useDay";

const Day = ({ appointments, numOfDaysFromToday }: DayProps) => {
  const { date, appointmentsSlots, handleSlotClick, getDisabled } = useDay({
    numOfDaysFromToday,
    appointments,
  });
  return (
    <div
      className={`px-1 flex flex-col ${
        numOfDaysFromToday ? "" : "today rounded"
      }`}
    >
      <span>{date.format("DD-MM")}</span>
      <div className="flex flex-col">
        {appointmentsSlots.map((slot) => {
          const disabled = getDisabled(slot);
          return (
            <button
              className={`slot my-1 px-2 py-1 text-center ${
                disabled ? "busy" : ""
              }`}
              key={numOfDaysFromToday + slot.hour}
              onClick={() => handleSlotClick(slot)}
              disabled={disabled}
            >
              {`${slot.hour}:00 - ${slot.hour + 1}:00`}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
