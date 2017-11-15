/**
  * Reset password mail template
  *
  * @param {object} req - Request from the client
  * @param {object} user - User requesting for a password reset
  * @param {string} resetPasswordHash - Token to validate the authenticity of
  * the request
  *
  * @returns {void} null
  */
const resetPasswordTemplate = (req, user, resetPasswordHash) => `
<div style="width: 100%; height: 100% background: black; padding: 50px 0 100px;">
  <div style="width: 70%; display: block; margin: 0 auto; border: 1px solid transparent; background: #F0F0EF;">
    <div>
      <h2 style="color: white; text-align: center; line-height: 10vh; background: #098cf5; margin: 0;">Post It</h2>
      <div style="margin: 30px;">
      <p style="font-size: 1rem;">Hello ${user.firstName} ${user.lastName},</p>
      <p style="font-size: 1rem;">
        You recently made a request to reset your Post It password.
        Please click the link below to complete the process.
      </p>
      <p style="font-size: 1rem; padding-bottom: 100px;">
        <a href='${req.headers.origin}/new-password/${resetPasswordHash}'>Reset now ></a>
      </p>
    <hr style="margin-bottom: 0;">
      <p style="text-align: center; margin: 7px;"><em>© Post It</em></p>
    </div>
  </div>
</div>`;

export default resetPasswordTemplate;
