import { MailtrapClient } from "mailtrap";

const TOKEN = "983b29bc41abd44f04b8b3399376bcbe";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Perfect Hair & Beauty",
};


async function sendConfirmationMail(recipient) {
  try {
    const response = await client.send({
      from: sender,
      to: [recipient], 
      subject: "Appointment Confirmed!",
      text: `Dear ${recipient.name}, your appointment has been successfully confirmed!`,
      category: "Appointment Notifications",
    });
    console.log("Confirmation email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}


async function sendCancellationMail(recipient) {
  try {
    const response = await client.send({
      from: sender,
      to: [recipient], 
      subject: "Appointment Cancelled",
      text: `Dear ${recipient.name},\n\nWe regret to inform you that your appointment has been canceled due another costumers booking time or due to unavailable time .\n\nPlease contact us to reschedule or for further assistance.\n\nThank you for your understanding.\n\nBest regards,\nPerfect Hair & Beauty`,
      category: "Appointment Notifications",
    });
    console.log("Cancellation email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
  }
}


export { sendConfirmationMail, sendCancellationMail };
