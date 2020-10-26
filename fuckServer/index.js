const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const allreq=require('./req/allControl');
const parseurl = require('parseurl')
const dataBus = require('./req/tools/databus')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const  action = require('./action')
const rooms=require('./req/tools/data').rooms;
const roomsEngine=require('./req/tools/data').roomsEngine;
const session  = require('express-session')
const Main = require('./main')
const contant = require('./contant')
const initRoom = ()=>{
    let main =new Main({ id: '123', peopleNum: 100 })
    main.init()
    // let roomPlayers = new RoomPlayers(user)
    //     roomPlayers.init(main)
    //     main.players.set(user.id,roomPlayers)
    roomsEngine.set('123',main)
}

app.use(session({
  saveUninitialized: true,
    secret: 'film',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // harlf of hour
    },
}))
app.use(function (req, res, next) {

  if (!req.session.views) {
    req.session.views = {}
  }
  var hour = 3600000
  req.session.cookie.expires = new Date(Date.now() + hour)
  req.session.cookie.maxAge = hour
  // get the url pathname
  var pathname = parseurl(req).pathname
 
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
 
  next()
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   socket.on('rosot', function(msg){
//     action(msg)
//   });
// });
function roomSocket(socket){
  for (var key of roomsEngine.keys()) {
      socket.on(key, function(msgObj){
        let main = roomsEngine.get(key)
        main.action(msgObj)
      });
  }
}
io.on('connection', function(socket){
  roomSocket(socket)
  socket.on('disconnect', function(id){
    console.log(socket.id)
  })
  
});
dataBus.io = io

initRoom()
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,user_id,token');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
allreq.setAllreq(app);
http.listen(port, function(){
  console.log('listening on *:' + port);
});