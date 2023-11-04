import React from "react";
import { useDay } from "./useDay";

interface Props {
  appointments: any[];
  numberOfDays: number;
}

const Day = ({ appointments, numberOfDays }: Props) => {
  const { date, appointmentsSlots, handleSlotClick } = useDay({
    appointments,
    numberOfDays,
  });
  return (
    <div className={numberOfDays ? "" : "today"}>
      <div className="flex flex-col">
        <span>{date.format("DD-MM")}</span>
        <div className="flex flex-col">
          {appointmentsSlots.map((slot) => (
            <button
              className={`slot my-1 px-2 py-1 text-center ${
                slot.appointment ? "busy" : ""
              }`}
              key={numberOfDays + slot.hour}
              onClick={() => handleSlotClick(slot)}
            >
              {`${slot.hour}:00 - ${slot.hour + 1}:00`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day;
