import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: 'mazi.mary.o@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
}));

export default transporter;
