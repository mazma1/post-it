import Nexmo from 'nexmo';

function sendSMS(smsParams) {
  const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_KEY,
    apiSecret: process.env.NEXMO_SECRET
  });

  const from = 'Post It';
  const to = smsParams.to;
  const text = `${smsParams.priority} message in ${smsParams.group}\n\n${smsParams.message}`;

  nexmo.message.sendSms(from, to, text);
}

export default sendSMS;
