import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

/**
  * Sends Email notification
  *
  * @param {object} emailParams - Details required to send email
  *
  * @returns {void} null
  */
function sendEmail(emailParams) {
  const mailOptions = {
    from: emailParams.senderAddress,
    to: emailParams.recepientAddress,
    subject: emailParams.subject,
    html: emailParams.emailBody
  };

  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'noreply.swiftpost@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  }));

  if (process.env.NODE_ENV !== 'production') {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent:${info.response}`);
      }
    });
  } else {
    transporter.sendMail(mailOptions);
  }
}
export default sendEmail;
