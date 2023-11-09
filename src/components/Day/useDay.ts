import dayjs from "dayjs";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const workingHours = [9, 10, 11, 12, 14, 15, 16, 17];

type GoogleEvent = {
  start: {
    dateTime: Date;
  };
};

type Slot = {
  busy: boolean;
  hour: number;
};

export interface DayProps {
  numOfDaysFromToday: number;
  appointments: GoogleEvent[];
}

export const useDay = ({ numOfDaysFromToday, appointments }: DayProps) => {
  const { handleModal } = useContext(ModalContext) || {};
  const date = dayjs().add(numOfDaysFromToday, "days");
  const filteredAppointments = appointments.filter(({ start }) =>
    date.isSame(start.dateTime, "day")
  );

  const appointmentsSlots = workingHours.map((hour) => ({
    hour,
    busy: filteredAppointments.some(
      ({ start }) => dayjs(start.dateTime).get("hour") === hour
    ),
  }));

  const handleSlotClick = async (slot: Slot) => {
    if (slot.busy) return;
    handleModal?.({
      selectedSlot: slot,
      selectedDate: date,
    });
  };

  const getDisabled = ({ busy, hour }: Slot) => {
    const isPastDay = numOfDaysFromToday < 0;
    const isPastHour = numOfDaysFromToday === 0 && hour <= dayjs().hour();
    return busy || isPastDay || isPastHour;
  };

  return {
    appointmentsSlots,
    handleSlotClick,
    getDisabled,
    date,
  };
};
