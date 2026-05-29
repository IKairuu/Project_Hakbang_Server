import * as dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API;

export const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendMessage = (receiver, otp) => {
  return {
    sender: {
      name: "Team Hakbang",
      email: "hakbangapp@gmail.com",
    },
    to: [{ email: receiver }],
    subject: "Account Verification",
    htmlContent: `
        <h1>Hakbang Account Verification</h1>
        <p>Your code is:</p>
        <h2>${otp}</h2>

        <p>If you didn’t ask for this code, you can ignore this email or check
           your account for actions.

           Thanks,</p>
    `,
  };
};
