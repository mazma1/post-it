import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

function sendEmail(emailParams) {
  const mailOptions = {
    from: emailParams.recepientAddress,
    to: emailParams.senderAddress,
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent:${info.response}`);
    }
  });
}

export default sendEmail;
