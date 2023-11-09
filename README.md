# Schedule Mate Documentation

Schedule Mate is a service that allows professionals to provide their clients with a calendar through which the clients can book an appointment. Appointments are saved in the professional's Google Calendar, while appointment requests are received through a Telegram channel, which allows the professional to save the appointment to their calendar with the click of a button.

The service is built using Gatsby for the front end and Pipedream for the back end.

To reuse this service, follow these steps:

## Getting Started

1. Clone the repository.

2. Copy the Pipedream workflow "Get Appointments Calendar":

   - Workflow Link: [Get Appointments Calendar](https://pipedream.com/@mirkotorrisi92/get-calendar-appointments-p_yKCzo66)

3. Copy the Pipedream workflow "Request Appointments Dispatcher":

   - Workflow Link: [Request Appointments Dispatcher](https://pipedream.com/@mirkotorrisi92/request-appointment-dispatcher-p_aNCpG7N)

4. Create a Telegram bot.

5. Create a Telegram channel and add the bot and the account of the professional interested in it.

6. Create a Google account or use the Google account credentials of the professional.

7. Fill in the Pipedream workflows with the data related to the Telegram bot, channel, and Google account.

8. Replace the API links exposed by the two Pipedream workflows in the "environment.ts" file.

## Notes

- Pipedream is a paid service, but it has a generous free tier.

Have any questions or need assistance? Feel free to reach out!
