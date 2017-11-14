import Nexmo from 'nexmo';

/**
  * Sends SMS notification
  *
  * @param {object} smsParams - Details required to send SMS
  *
  * @returns {void} null
  */
function sendSms(smsParams) {
  const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_KEY,
    apiSecret: process.env.NEXMO_SECRET
  });

  const from = 'Post It';
  const to = smsParams.to;
  const text = `${smsParams.priority} message in ${smsParams.group}\n\n${smsParams.message}`;

  nexmo.message.sendSms(from, to, text);
}

export default sendSms;
