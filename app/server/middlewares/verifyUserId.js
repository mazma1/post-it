/**
  * Verifies a user's id before route handlers are executed
  *
  * @param {object} req - Request from the client
  * @param {object} res - Response sent back to the client
  * @param {function} next - Executes succeeding middleware
  *
  * @returns {function} next
 */
export default function verifyUserId(req, res, next) {
  const { userId } = req.params;
  if (userId && isNaN(userId)) {
    return res.status(400).send({ error: 'Invalid user id' });
  }
  return next();
}
