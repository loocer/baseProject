const demoData = require('./tools/demoData')
var userControl = {};
const data = require('../req/tools/data');
const getAuthorize = require('./tools/auth').getAuthorize;
const auth = require('./tools/auth').authorize
const RoomPlayers = require('../req/roomPlayers');
const Main = require('../main')
const roomsEngine=require('../req/tools/data').roomsEngine;
// var ZhajinhuaPlayer = require('../gameMain/player');
const acType = {
  ON_COME: 'ON_COME',
  ON_READY: 'ON_READY',
  ON_START: 'ON_START',
  SHOW_VALUE: 'SHOW_VALUE',
  GAME_PASS: 'GAME_PASS',
  GAME_PK: 'GAME_PK',
  ON_RAISE: 'ON_RAISE',
  ADD_RAISE: 'ADD_RAISE'
}
const filter = require('./tools/filter')
userControl.getUserInfo = function (app) {
  // app.get('/get-userInfo', filter.authorize, function (req, res) {
    // let results = {}
    // let user = req.query
    // console.log(user)
    // const users = demoData.users
    // let flag = false
    // for (var u in users) {
    //   console.log(user.id)
    //   console.log(users[u].id)
    //   if (users[u].id === user.id) {
    //     user = users[u]
    //     results.status = 1
    //     results.data = { user: user }
    //     results.msg = '获取成功！'
    //     res.status(200)
    //     res.json(results)
    //   }
    // }
  // })
}
userControl.getRoomStatus = function (app) {
  app.get('/get-roomStatus', filter.authorize, function (req, res) {
    // let results = {}
    // let roomNo = req.query.roomNo
    // const users = demoData.users
    // if (rooms.size != 0 && rooms.has(roomNo)) {
    //   results.status = 1
    //   results.msg = '正在进行！'
    //   res.status(200)
    //   res.json(results)
    // } else {
    //   results.status = 0
    //   results.msg = '已经结束！'
    //   res.status(200)
    //   res.json(results)
    // }
  })
}
userControl.createRoom = function (app) {
  app.get('/create-room', filter.authorize, function (req, res) {
    console.log(req.session)
    let results = {}
    let roomNo = req.query.roomNo
    let peopleNum = req.query.peopleNum
    let userId = req.headers.user_id
    let user = data.users.get(userId)
    const detaRooms = demoData.rooms
    let status = detaRooms.has(roomNo)
    if (status) {
      status = data.roomsEngine.size != 0 && data.roomsEngine.has(roomNo)
      if (status) {
        results.status = 2
        results.msg = '房间号已被创建！'
        res.status(403),
        res.json(results)
      }
      if (!status) {
        demoData.rooms.delete(roomNo)
        const main =new Main({ id: roomNo, peopleNum: peopleNum })
        main.init()
        let roomPlayers = new RoomPlayers(user)
        roomPlayers.init(main)
        main.players.set(user.id,roomPlayers)
        roomsEngine.set(roomNo,main)

        results.msg = '房间创建成功！'
        res.status(200),
          res.json(results)
      }
    } else {
      results.status = 0
      results.msg = '没有这个房间（房号不对）！'
      res.status(200),
        res.json(results)
    }
  })
}
userControl.addPlaytoRoom = function (app) {
  app.get('/into-room', filter.authorize, function (req, res) {
    // let results = {}
    // console.log(req.query.roomNo)
    // let roomNo = req.query.roomNo
    // /*--------判断房卡是否有效--------*/
    // // console.log(req)
    // let status = rooms.has(roomNo)
    // // for(var n in demoData.rooms){
    // //   if(demoData.rooms[n].id == roomNo){
    // //     status = true
    // //   }
    // // }
    // // let room = null
    // // for(let i in rooms){
    // //     if(rooms[i].id == roomNo){
    // //       status = true
    // //       room= rooms[i]
    // //     }
    // //   }
    // if (status) {
    //   const room = rooms.get(roomNo)
    //   if (room.players.length < room.peopleNum) {
    //     //-----------------------------------//
    //     let user = null
    //     for (var u in demoData.users) {
    //       if (demoData.users[u].id === req.session.user_id) {
    //         user = demoData.users[u]
    //       }
    //     }
    //     //------------------------------------//
    //     var player = new ZhajinhuaPlayer(user)
    //     player.isMain = false
    //     room.players.set(player.id, player)
    //     results.status = 1
    //     results.data = { roomNo: roomNo, peopleNum: room.peopleNum }
    //     results.msg = '欢迎进入！'
    //     res.status(200),
    //       res.json(results)
    //   } else {
    //     results.status = 0
    //     results.msg = '进入失败！'
    //     res.status(200),
    //       res.json(results)
    //   }
    // }

  })
}
userControl.login = function (app) {
  app.post('/login', function (req, res) {
    let results = {}
    const user = req.body
    user.token = auth(user)
    data.users.set(user.id,user)
    req.session.user_id = user.id
    results.status = 1
    results.msg = '创建成功！'
    results.data = user
    res.status(200)
    res.json(results)
  })
}
userControl.getValue = function (app) {
  // app.post('/get-value', function (req, res) {
//     let results = {}
//     let roomNo = req.query.roomNo
//     let userId = req.session.user_id
//     let roomPlayers = null
//     let value = []
//     for (let i in rooms) {
//       if (rooms[i].id == roomNo) {
//         roomPlayers = rooms[i]
//       }
//     }
//     for (let t in roomPlayers.players) {
//       if (userId == roomPlayers.players[t].id) {
//         value = roomPlayers.players[t].pokerValue
//       }
//     }
//     results.msg = '获取成功！'
//     results.data = { value: value }
//     res.status(200)
//     res.json(results)
//   })
// }
// userControl.allUser = function (app) {
//   app.post('/all-user', function (req, res) {
//     var pams = req.body
//     console.log(pams)
//     let results = {}
//     let userArray = []
//     for (let i = 0; i < 10; i++) {
//       let obj = {}
//       obj.name = 'ergouzi' + i
//       obj.id = i
//       userArray.push(obj)
//     }
//     results.data = userArray
//     res.status(200)
//     res.json(results)
//   })
}
// userControl.getTset=function(app){
//  app.get('/get-test',function(req,res){
//  	userDao.test().then(function(value){
//       res.status(200),
// 	  res.json(value)
//  	});
//   })
// }
// userControl.register = function (app) {
//   app.get('/add-user',function(req,res){
//   	let user = req.query
//   	userDao.register().then(function(value){
//       res.status(200),
//       res.json(userLang.REGISTSUCCESS)
//   	})
//   	console.log(req.query)
//     // userDao.addUser().then(function(value){
//     //   res.status(200),
//     //   res.json()
//     // })
//   })
// }
module.exports = userControl