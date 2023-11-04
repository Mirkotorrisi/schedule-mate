import {
  SyntheticEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ModalContext } from "../../context/ModalContext";
import { sendAppointmentRequest } from "../../services";

export enum Step {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const initialForm = {
  name: "",
  phone: "",
  email: "",
};

export type Form = { message?: string } & typeof initialForm;

const reducer = (
  state: typeof initialForm,
  action: { key: string; value: string }
) => ({
  ...state,
  [action.key]: action.value,
});

const useAppointment = () => {
  const { showModal, handleModal, modalContent } =
    useContext(ModalContext) || {};

  const [step, setStep] = useState<Step | null>(null);
  const [form, dispatch] = useReducer(reducer, initialForm);

  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setStep(null);
  }, []);

  const errors: Record<string, boolean> = Object.keys(initialForm).reduce(
    (acc, key) => ({ ...acc, [key]: !Object.hasOwn(form, key) }),
    {}
  );
  const hasErrors = Object.values(errors).some((error) => !!error);
  const hasEmpty = Object.keys(initialForm).some(
    (key) => !Object.hasOwn(form, key)
  );

  const dateToSend = modalContent?.selectedDate
    ?.set("hour", modalContent?.selectedSlot?.hour || 0)
    .set("minutes", 0)
    .format("YYYY-MM-DD-HH-mm");

  const dateToShow = modalContent?.selectedDate
    ?.set("hour", modalContent?.selectedSlot?.hour || 0)
    .set("minutes", 0)
    .format("DD/MM alle HH:mm");

  const handleChange = (e: {
    target: { name: string; value: string; validity: { valid: boolean } };
  }) => {
    dispatch({
      key: e.target.name,
      value: e.target.value,
    });
    errors[e.target.name as keyof typeof errors] = !e.target.validity.valid;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (hasErrors || hasEmpty) return;
    setStep(Step.LOADING);

    const res = await sendAppointmentRequest({
      ...form,
      date: dateToSend || "",
    });
    setStep(!!res ? Step.SUCCESS : Step.ERROR);
  };

  const closeModal = () => {
    handleModal?.(null);
    setStep(null);
  };
  return {
    handleSubmit,
    handleChange,
    closeModal,
    dateToShow,
    showErrors,
    showModal,
    errors,
    step,
    form,
  };
};

export default useAppointment;
