var userControl={};
var userDao=require('../dao/userDao');
var userLang = require('../lang/userLang');
userControl.getUserInfo=function(app){
  app.get('/get-alluser',function(req,res){
   	userDao.getAllUser().then(function(data){
      res.status(200),
      res.json(data)
    })
  })
}
// userControl.getTset=function(app){
//  app.get('/get-test',function(req,res){
//  	userDao.test().then(function(value){
//       res.status(200),
// 	  res.json(value)
//  	});
//   })
// }
userControl.info = function (app) {
  app.get('/user/info',function(req,res){
    let data = {name:'张三',id:3232323,avatar:'http://gitlab.ybejia.com:3080/jenkins/static/4ec26488/images/headshot.png',roles:[2,3,4,4,4,45]}
    res.status(200),
    res.json(data)
    // userDao.addUser().then(function(value){
    //   res.status(200),
    //   res.json()
    // })
  })
}
userControl.getEmployees = function (app) {
  app.get('/authority/get-employees',function(req,res){
    let list =[]
    for(let i = 0;i<10;i++){
      let obj = {
        cl1:'cl1'+i,
        cl2:'cl2'+i,
        cl3:'cl3'+i,
        cl4:'cl4'+i,
        cl5:'cl5'+i,
        cl6:'cl6'+i,
      }
      list.push(obj)
    }
    res.status(200),
    res.json({list})
    // userDao.addUser().then(function(value){
    //   res.status(200),
    //   res.json()
    // })
  })
}
userControl.login = function (app) {
  app.post('/user/login',function(req,res){
  	let data = {token: Math.floor(Date.now() / 1000)}
    res.status(200),
    res.json(data)
    // userDao.addUser().then(function(value){
    //   res.status(200),
    //   res.json()
    // })
  })
}
module.exports=userControl