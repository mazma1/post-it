/**
  * Email notification template
  *
  * @param {object} req - Request from the client
  * @param {string} priority - Message priority
  * @param {object} messageDetail - Details of the message sent
  * @param {object} username - User who sent the message
  *
  * @returns {void} null
  */
const emailNotificationTemplate = (req, priority, messageDetail, username) => `
<div style="width: 100%; height: 100% background: black; padding: 50px 0 100px;">
  <div style="width: 70%; display: block; margin: 0 auto; border: 1px solid transparent; background: #F0F0EF;">
    <div>
      <h2 style="color: white; text-align: center; line-height: 10vh; background: #098cf5; margin: 0;">Post It</h2>
      <div style="margin: 30px;">
      <p style="font-size: 1rem;">Hi Mary,</p>
      <p style="font-size: 1rem;">You have a new ${priority} message from <b>@${username}</b>:</p>
      <p style="font-size: 1rem;"><em>"${messageDetail.body}"</em></p>
      <p style="font-size: 1rem;">Click button to view message details</p>
      <p style="padding: 0.5rem;"></p>
        
      <div style="text-align: center; padding-bottom: 20px;">
        <a
          style="padding: 0.7rem 2rem; background: #098cf5; color: white; text-decoration: none; border-radius: 2px;"
          href='http://${req.headers.host}/message-board/${messageDetail.groupId}'
        >
          View Message
        </a>
       </div> 
    </div>
    <hr style="margin-bottom: 0;">
      <p style="text-align: center; margin: 7px;"><em>© Post It</em></p>
    </div>
  </div>
</div>`;

export default emailNotificationTemplate;

