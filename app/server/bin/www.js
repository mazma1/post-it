// This will be our application entry. We'll setup our server here.
const app = require('../app'); // The express app we just created on index.js

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started on port 3000');
});
