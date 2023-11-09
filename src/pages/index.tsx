import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Calendar from "../components/Calendar";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { environment } from "../environment";
import "../styles/colors.scss";
import "./index.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="py-4 px-2 container flex flex-col items-center justify-center">
      <div className="mb-8">
        <h1 className="text-left text-2xl lg:text-8xl mb-4">Schedule mate</h1>
        <p>
          Schedule Mate is a service that allows professionals to schedule
          appointments with their clients by displaying their available time
          slots.
        </p>
        <p>
          {" "}
          Appointments are saved in the professional's Google Calendar, and
          received through a Telegram channel.
        </p>{" "}
        <p>
          The service is built using Gatsby for the front end and Pipedream for
          the back end.
        </p>
      </div>
      <Calendar />

      <h2 className="text-4xl my-8">Getting Started</h2>

      <ol className="list-disc mb-8">
        <li>Clone the repository.</li>
        <li>
          Copy the Pipedream workflow:
          <a
            href={environment.PIPEDREAM_GET_EVENTS}
            aria-label="Pipedream get Events url"
            className="mr-4 link"
          >
            {">"}Get events workflow
          </a>
        </li>
        <li>
          Copy the Pipedream workflow:
          <a
            href={environment.PIPEDREAM_POST_APPOINTMENT}
            aria-label="Pipedream post Appointment url"
            className="link"
          >
            {">"}Request appointment workflow
          </a>
        </li>
        <li>Create a Telegram bot.</li>
        <li>
          Create a Telegram channel and add the bot and the account of the
          professional interested in it.
        </li>
        <li>
          Create a Google account or use the Google account credentials of the
          professional.
        </li>
        <li>
          Fill in the Pipedream workflows with the data related to the Telegram
          bot, channel, and Google account.
        </li>
        <li>
          Replace the API links exposed by the two Pipedream workflows in the
          "environment.ts" file.
        </li>
      </ol>

      <h2 className="font-bold">Notes</h2>

      <p>Pipedream is a paid service, but it has a generous free tier.</p>

      <div className="flex mt-8 items-center font-bold">
        <p>Have any questions or need assistance? Feel free to reach out!</p>
        <a className="pl-2" href="https://github.com/Mirkotorrisi">
          <FaGithub />
        </a>
        <a className="pl-2" href="https://www.facebook.com/mirko.torrisi92/">
          <FaFacebook />
        </a>
        <a className="pl-2" href="https://www.linkedin.com/in/mirko-torrisi/">
          <FaLinkedin />
        </a>
        <a className="pl-2" href="mailto:mirko.torrisi92@gmail.com">
          <FaEnvelope />
        </a>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Schedule Mate - Your Free Professional Appointment Assistant</title>
);
