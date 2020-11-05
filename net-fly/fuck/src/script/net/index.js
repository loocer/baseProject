
let address = 'http://192.168.2.100:3000'
  import utl from "../utl.js"
let HttpRequest = Laya.HttpRequest
let Event       = Laya.Event;
let result = {}
export const login = ()=>
{	
	let obj = {}
	let hr = new HttpRequest();
	// let id = Date.parse(new  Date())
	let id = 435
	function onHttpRequestProgress(e){
		console.log(e)
	}
	function onHttpRequestComplete(e){
		result.userInfo = JSON.parse(hr.data).data;
		console.log(66666,result)
		intoRoom()
	}
	function onHttpRequestError(e){
		console.log(e)
	}
	
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/login', 'name=fef&id='+id, 'post', 'text');
	
}
export const getServiceAddress = ()=>
{
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		result.serviceAddress = JSON.parse(hr.data).data;
		login()
		console.log(3458888,result)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/get-socketAddress', '', 'get', 'text');
	
}
export const intoRoom = ()=>
{
	let headers = [
		"Content-Type", "application/x-www-form-urlencoded",
		'token', result.userInfo.token,
		'user_id',result.userInfo.id
	];
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		socketMain()
		console.log(888888888,hr)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/into-room?roomNo=123', null, 'get', 'text',headers);
	
}
export const socketMain = ()=>
{
 // 	let byte = new Laya.Byte();
 // 	let socket = new Laya.Socket();
 // 	function openHandler(e){
	// 	console.log(123)
	// }
	// function receiveHandler(e){
	// 	console.log(888888888,hr)
	// }
	// function closeHandler(e){
	// 	console.log(534543,e)
	// }
	// function errorHandler(e){
	// 	console.log(534543,e)
	// }
 //    //这里我们采用小端
 //   	socket.endian = Laya.Byte.LITTLE_ENDIAN;
 //        //建立连接
 //    socket.connectByUrl(result.serviceAddress);
 //    socket.on(Laya.Event.OPEN, this, openHandler);
 //    socket.on(Laya.Event.MESSAGE, this, receiveHandler);
 //    socket.on(Laya.Event.CLOSE, this, closeHandler);
 //    socket.on(Laya.Event.ERROR, this, errorHandler);
	utl.socket = io(result.serviceAddress);
	utl.socket.on('main_update', (s) => {
		setBox(s.players[0][1])
    });
    utl.socket.on('event', function (data) { });
    utl.socket.on('disconnect', function () { });
}
const setBox = (obj)=>{
	if(utl.box&&obj.rotation&&obj.position){
		 utl.box.transform.rotate(new Laya.Vector3(0,0,-obj.rotation.z* Math.PI / 180),true);
        utl.box.transform.rotate(new Laya.Vector3(0,-obj.rotation.x* Math.PI / 180,0),true);
        utl.box.transform.rotate(new Laya.Vector3(obj.rotation.y* Math.PI / 180,0,0),true);
        utl.box.transform.rotation = new Laya.Vector3(utl.box.transform.rotation.x,utl.box.transform.rotation.y,utl.box.transform.rotation.z)
		utl.box.transform.position = new Laya.Vector3(obj.position.x,obj.position.y,obj.position.z)
	}
	
}