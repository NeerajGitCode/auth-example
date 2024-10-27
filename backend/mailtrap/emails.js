import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]; // Adjust this if necessary based on mailtrapClient's requirements
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }]; // Adjust this if necessary based on mailtrapClient's requirements
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "5db445d1-a691-4319-9483-c7bb1acfbc53",
      template_variables: {
        company_info_name: "Facebook",
        name: name,
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {}
};

export const sendForgotPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }]; // Adjust this if necessary based on mailtrapClient's requirements
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password Reset Email sent successfully", response);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }]; // Adjust this if necessary based on mailtrapClient's requirements
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password Reset Email sent successfully", response);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
