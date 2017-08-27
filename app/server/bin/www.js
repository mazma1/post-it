import app from '../app';

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

const io = require('socket.io').listen(app.listen(port));

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
