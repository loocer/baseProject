export default  {
	tachLeftFlag:false,//左边点击
	tachRightFlag:false,//左边点击
	box:null,
    userId:Date.parse(new  Date())+'',
    players:new Map(),
    box4:null,
    speedMove:.4,
    speed:{
    	z:0,
    	x:0,
    	y:0
    },
    walkingDirection:1,//1：up,2:down,3:left,4:right
    netPlayers:null,
    takeSpeed:{
    	z:0,
    	x:0,
    	y:0
    },
    entity:new Map(),
    operationYype:1//1:虚拟手柄 2:屏幕方向
}