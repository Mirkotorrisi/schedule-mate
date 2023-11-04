import dayjs from "dayjs";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const workingHours = [9, 10, 11, 12, 14, 15, 16, 17];

export type Slot = {
  appointment: any;
  hour: number;
};

interface Props {
  appointments: any[];
  numberOfDays: number;
}
export const useDay = ({ numberOfDays, appointments }: Props) => {
  console.log("🚀 ~ file: useDay.ts:17 ~ useDay ~ appointments:", appointments);
  const { handleModal } = useContext(ModalContext) || {};
  const date = dayjs().add(numberOfDays, "days");
  const filteredAppointments = appointments.filter(({ start }) =>
    date.isSame(start.dateTime, "day")
  );

  const appointmentsSlots = workingHours.map((hour) => ({
    hour,
    appointment: filteredAppointments.find(
      ({ start }) => dayjs(start.dateTime).get("hour") === hour
    ),
  }));

  const handleSlotClick = async (slot: Slot) => {
    if (slot.appointment) return;
    handleModal?.({
      selectedSlot: slot,
      selectedDate: date,
    });
  };

  return {
    appointmentsSlots,
    handleSlotClick,
    date,
  };
};
