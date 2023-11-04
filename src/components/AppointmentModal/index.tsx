import "./index.scss";
import React from "react";
import { FaEnvelope, FaPencilAlt, FaPhone, FaUser } from "react-icons/fa";
import useAppointment, { Form, Step } from "./useAppointment";
import { environment } from "../../environment";

const AppointmentModal = () => {
  const {
    showModal,
    closeModal,
    dateToShow,
    handleChange,
    handleSubmit,
    form,
    step,
    showErrors,
    errors,
  } = useAppointment();
  if (!showModal) return;

  return (
    <div
      className="appointment-modal flex flex-col justify-center max-w-md fixed z-10 rounded-lg p-5"
      id="contact"
    >
      <h1 className="appointment-modal__title mb-5">
        Richiedi un appuntamento il {dateToShow}
      </h1>
      <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
        <div className="flex items-center gap-5">
          <FaUser />
          <input
            id="name"
            name="name"
            required
            placeholder="Nome e cognome del paziente"
            minLength={2}
            value={form.name}
            onChange={handleChange}
            className={`lg:h-20 w-full rounded-md px-2 ${
              errors["name"] && showErrors && "invalid"
            }`}
          />
        </div>
        {errors["name"] && showErrors && (
          <span className="error">Inserisci un nome</span>
        )}
        <div className="flex items-center gap-5">
          <FaPhone />
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
            placeholder="Numero di telefono (senza prefisso)"
            value={form.phone}
            onChange={handleChange}
            className={`lg:h-20 w-full rounded-md px-2 ${
              errors["phone"] && showErrors && "invalid"
            }`}
          />
        </div>
        {errors["phone"] && showErrors && (
          <span className="error">
            Inserisci un numero di telefono valido (senza prefisso)
          </span>
        )}
        <div className="flex items-center gap-5">
          <FaEnvelope />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="La tua email"
            value={form.email}
            onChange={handleChange}
            className={`lg:h-20 w-full rounded-md px-2 ${
              errors["email"] && showErrors && "invalid"
            }`}
          />
        </div>
        {errors["email"] && showErrors && (
          <span className="error">Inserisci un'email valida</span>
        )}
        <div className="flex items-center gap-5">
          <FaPencilAlt />
          <input
            id="message"
            name="message"
            placeholder="Messaggio (opzionale)"
            value={(form as Form).message}
            onChange={handleChange}
            className="lg:h-20 w-full rounded-md px-2"
          />
        </div>
        <button className={`mt-5 cta rounded-md  py-5 ${step}`} type="submit">
          <ProgressStepper step={step} />
        </button>
        {step !== Step.SUCCESS && (
          <button className="mt-2 close-button" onClick={closeModal}>
            Annulla
          </button>
        )}
        <i className="disclaimer mt-5">
          Inviando i tuoi dati aderisci alla nostra
          <a href={environment.PRIVACY_POLICY} className=" ml-1 underline">
            privacy policy
          </a>
        </i>
      </form>
      {step === Step.SUCCESS && (
        <>
          <h2 className="thanks animation_in mt-2">
            La richiesta di prenotazione è avvenuta con successo, riceverai un
            messaggio per confermare l'appuntamento.
          </h2>
          <button className="mt-2 close-button" onClick={closeModal}>
            Chiudi
          </button>
        </>
      )}
    </div>
  );
};

const ProgressStepper = ({ step }: { step: Step | null }) => {
  switch (step) {
    case Step.LOADING:
      return (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    case Step.SUCCESS:
      return (
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      );
    case Step.ERROR:
      return "Qualcosa è andato storto, prova di nuovo.";

    default:
      return "Invia la prenotazione";
  }
};

export default AppointmentModal;
