var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Main = require('./main')
const  action = require('./action')
var main =new Main()

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('rosot', function(msg){
    action(msg)
  });
});
main.init(io)
http.listen(port, function(){
  console.log('listening on *:' + port);
});