const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const allreq=require('./req/allControl');
const port = process.env.PORT || 3000;
const Main = require('./main')
const  action = require('./action')
const rooms=require('./req/tools/demoData').rooms;
const roomsEngine=require('./req/tools/demoData').roomsEngine;
const main =new Main()

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   socket.on('rosot', function(msg){
//     action(msg)
//   });
// });
function roomSocket(socket){
  for (var key of rooms.keys()) {
      socket.on(key, function(msgObj){
        let main = roomsEngine.get(key)
        main.action(msg)
      });
  }
}
io.on('connection', function(socket){
  roomSocket(socket)
  socket.on('disconnect', function(id){
    console.log(socket.id)
  })
  
});
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
allreq.setAllreq(app);
http.listen(port, function(){
  console.log('listening on *:' + port);
});