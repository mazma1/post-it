// This will be our application entry. We'll setup our server here.
const app = require('../index'); // The express app we just created on index.js

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
