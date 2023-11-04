import axios from "axios";
import { environment } from "../environment";

type SendAppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  date: string;
  message?: string;
};
export const sendAppointmentRequest = async ({
  name,
  email,
  phone,
  date,
  message = "Nuova richiesta di appuntamento",
}: SendAppointmentPayload) => {
  return axios.post(environment.POST_APPOINTMENT_URL, {
    name,
    email,
    phone,
    message,
    date,
  });
};
