import sendSms from '../utils/sendSms';
import sendEmail from '../utils/sendEmail';
import emailNotificationTemplate from '../utils/emailNotificationTemplate';

/**
 * Sends email and SMS notifications to users depending on the message priority
 *
 * @param {object} req - Request object from the client
 * @param {object} message - Instance of the message created
 * @param {object} messageDetail - Details of message posted to the database
 *
 * @returns {void} null
 */
function sendNotification(req, message, messageDetail) {
  let groupName;
  const { priority } = req.body;
  const { username } = req.decoded.data;
  const userDetails = [];

  message.getGroup({ where: { id: req.params.groupId } })
  .then((group) => {
    groupName = group.groupName;
    group.getMembers().then((members) => {
      members.map(member =>
        userDetails.push({
          phone: member.phoneNumber,
          email: member.email
        }));
      if (req.body.priority === 'urgent' || req.body.priority === 'critical') {
        const uppercasePriority = priority.toUpperCase();
        return userDetails.map((userDetail) => {
          const emailParams = {
            senderAddress: `"Post It ✔" <${process.env.ADMIN_EMAIL}>`,
            recepientAddress: userDetail.email,
            groupName,
            subject: `Post It: ${uppercasePriority} message in ${groupName}`,
            emailBody: emailNotificationTemplate(
              req, priority, messageDetail, username
            )
          };
          sendEmail(emailParams);

          if (req.body.priority === 'critical'
          && process.env.NODE_ENV !== 'test') {
            const smsParams = {
              priority: uppercasePriority,
              group: groupName,
              message: messageDetail.body,
              to: userDetail.phone
            };
            sendSms(smsParams);
          }
        });
      }
    });
  });
}

export default sendNotification;
